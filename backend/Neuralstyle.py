import tensorflow as tf
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import tensorflow_hub as hub
import sys
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

def load_and_preprocess_image(image_path, target_size=(512, 512)):
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=target_size)
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = image / 255.0
    return tf.convert_to_tensor(image, dtype=tf.float32)

def multi_scale_processing(hub_model, content_image, style_image, scales=[1.0, 0.75, 0.5]):
    stylized_images = []
    for scale in scales:
        scaled_content_image = tf.image.resize(content_image, (int(content_image.shape[1] * scale), int(content_image.shape[2] * scale)))
        scaled_style_image = tf.image.resize(style_image, (int(style_image.shape[1] * scale), int(style_image.shape[2] * scale)))
        stylized_image_tensor = hub_model(scaled_content_image, scaled_style_image)[0]
        stylized_image_tensor = tf.image.resize(stylized_image_tensor, (content_image.shape[1], content_image.shape[2]))
        stylized_images.append(stylized_image_tensor)
    stylized_image_tensor = tf.reduce_mean(tf.stack(stylized_images), axis=0)
    return stylized_image_tensor

def post_process_image(image_np):
    image_np = np.clip(image_np * 255.0, 0, 255).astype(np.uint8)
    image_pil = Image.fromarray(image_np)
    enhancer = ImageEnhance.Contrast(image_pil)
    image_pil = enhancer.enhance(1.5)
    enhancer = ImageEnhance.Brightness(image_pil)
    image_pil = enhancer.enhance(1.2)
    enhancer = ImageEnhance.Color(image_pil)
    image_pil = enhancer.enhance(1.3)
    image_pil = image_pil.filter(ImageFilter.DETAIL)
    image_pil = image_pil.filter(ImageFilter.SHARPEN)
    return image_pil

def main(content_image_path, style_image_path, output_image_path):
    hub_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')
    content_image = load_and_preprocess_image(content_image_path, target_size=(1024, 1024))
    style_image = load_and_preprocess_image(style_image_path, target_size=(1024, 1024))
    stylized_image_tensor = multi_scale_processing(hub_model, content_image, style_image)
    stylized_image_np = stylized_image_tensor.numpy()
    stylized_image_np = np.squeeze(stylized_image_np, axis=0)
    stylized_image_pil = post_process_image(stylized_image_np)
    stylized_image_pil.save(output_image_path)
    return output_image_path

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print("Usage: python image_gen.py <content_image_path> <style_image_path> <output_image_path>")
        sys.exit(1)

    content_image_path = sys.argv[1]
    style_image_path = sys.argv[2]
    output_image_path = sys.argv[3]
    main(content_image_path, style_image_path, output_image_path)
