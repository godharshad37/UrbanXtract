import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from PIL import Image

# Load the trained model
model = tf.keras.models.load_model("backend/src/model_ml/build.h5")  

# Function to make a prediction on an image
def predict_image(image_path):
    threshold = 0.5  # Set the decision threshold
    
    img = Image.open(image_path).convert("RGB")
    img = img.resize((128, 128), Image.LANCZOS)
    np_img = np.array(img)

    # Normalize if needed (depending on how the model was trained)
    # np_img = np_img / 255.0

    np_img = np.expand_dims(np_img, axis=0)  # Add batch dimension

    # Make a prediction
    pred = model.predict(np_img)[0]  # Get the first (and only) output
    pred_mask = (pred > threshold).astype(np.uint8).squeeze()

    # Create a yellow and black RGB mask
    yellow = [255, 255, 0]
    black = [0, 0, 0]
    mask_rgb = np.zeros((128, 128, 3), dtype=np.uint8)
    mask_rgb[pred_mask == 1] = yellow
    mask_rgb[pred_mask == 0] = black

    output_path = "backend/public/Output/build_mask.jpg"
    pred_img = Image.fromarray(mask_rgb)
    pred_img.save(output_path, format="JPEG")
    
# Example usage
image_path = "backend/public/Input/sat.jpg" 
predict_image(image_path)