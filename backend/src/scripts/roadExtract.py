import tensorflow as tf
from tensorflow import keras
import numpy as np
import cv2
import matplotlib.pyplot as plt

# Function to customize model loading
def custom_load_model(model_path):
    return keras.models.load_model(model_path, compile=False)

# Load the model
MODEL_PATH = "backend/src/model_ml/roads_extraction.h5"
model = custom_load_model(MODEL_PATH)


# Preprocess image
def preprocess_image(image_path, img_size=(256, 256)):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, img_size)
    image = image / 255.0
    return np.expand_dims(image, axis=0)

# Predict roads
def predict_road(image_path, output_path):
    input_image = preprocess_image(image_path)
    prediction = model.predict(input_image)
    prediction = (prediction > 0.5).astype(np.uint8)
    mask = prediction[0].squeeze()  # Shape: (256, 256)

    # Create RGB mask: gray for road (128,128,128), black for background
    gray = [128, 128, 128]
    black = [0, 0, 0]
    mask_rgb = np.zeros((mask.shape[0], mask.shape[1], 3), dtype=np.uint8)
    mask_rgb[mask == 1] = gray
    mask_rgb[mask == 0] = black

    # Save RGB mask
    cv2.imwrite(output_path, cv2.cvtColor(mask_rgb, cv2.COLOR_RGB2BGR))
    print(f"Road detection mask saved to {output_path}")

# Run the model
output_path="backend/public/output/road_mask.jpg"
input_path="backend/public/input/sat.jpg"
predict_road(input_path,output_path)
