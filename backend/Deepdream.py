import tensorflow as tf
import numpy as np
from PIL import Image
import sys
def preprocess_image(image, target_size=(512, 512)):
    # Resize image
    image = image.resize(target_size)
    # Convert image to array
    image = tf.keras.preprocessing.image.img_to_array(image)
    # Normalize image to [0, 1]
    image = image / 255.0
    return tf.convert_to_tensor(image, dtype=tf.float32)

def calc_loss(img, model):
    """Takes an input image and calculates the loss."""
    img_batch = tf.expand_dims(img, axis=0)
    layer_activations = model(img_batch)
    if not isinstance(layer_activations, list):
        layer_activations = [layer_activations]
    losses = [tf.reduce_mean(act) for act in layer_activations]
    return tf.reduce_sum(losses)

def deepdream(model, img, step_size=0.01, steps=80):
    img = tf.convert_to_tensor(img)
    for step in range(steps):
        with tf.GradientTape() as tape:
            tape.watch(img)
            loss = calc_loss(img, model)
        gradients = tape.gradient(loss, img)
        gradients /= tf.math.reduce_std(gradients) + 1e-8
        img = img + gradients * step_size
        img = tf.clip_by_value(img, 0, 1)
        if step % 10 == 0:
            print(f'Step {step}, Loss {loss}')
    return img

def multi_scale_processing(model, image, scales=[1.0, 0.75], steps=80, step_size=0.01):
    processed_images = []
    for scale in scales:
        scaled_image = tf.image.resize(image, (int(image.shape[0] * scale), int(image.shape[1] * scale)))
        dream_image = deepdream(model, scaled_image, step_size=step_size, steps=steps)
        dream_image = tf.image.resize(dream_image, (image.shape[0], image.shape[1]))
        processed_images.append(dream_image)
    return tf.reduce_mean(tf.stack(processed_images), axis=0)

def post_process_image(image_np):
    # Clip values to be between 0 and 255 and convert to uint8
    image_np = np.clip(image_np * 255.0, 0, 255).astype(np.uint8)
    # Convert to PIL image
    return Image.fromarray(image_np)

def apply_deepdream(input_image):
    # Load the InceptionV3 model
    base_model = tf.keras.applications.InceptionV3(include_top=False, weights='imagenet')
    layer_names = ['mixed3', 'mixed5']
    layers = [base_model.get_layer(name).output for name in layer_names]
    dream_model = tf.keras.Model(inputs=base_model.input, outputs=layers)

    # Preprocess the image
    image = preprocess_image(input_image, target_size=(512, 512))

    # Perform multi-scale DeepDream processing
    dream_image = multi_scale_processing(dream_model, image, steps=30, step_size=0.01)

    # Convert tensor to numpy array
    dream_image_np = dream_image.numpy()

    # Post-process the image
    dream_image_pil = post_process_image(dream_image_np)

    return dream_image_pil

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python deepdream.py <input_image_path> <output_image_path>")
        sys.exit(1)

    input_image_path = sys.argv[1]
    output_image_path = sys.argv[2]

    # Load an image using PIL
    input_image = Image.open(input_image_path)

    # Apply DeepDream
    output_image = apply_deepdream(input_image)

    # Save the result
    output_image.save(output_image_path)
    print(f"DeepDream image saved at {output_image_path}")
