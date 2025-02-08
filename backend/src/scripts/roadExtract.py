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
def predict_road(image_path, output_path="backend/public/output/road_mask.png"):
    input_image = preprocess_image(image_path)
    prediction = model.predict(input_image)
    prediction = (prediction > 0.5).astype(np.uint8)
    mask = (prediction[0] * 255).astype(np.uint8)

    # Save the water detection mask to the public/output folder
    cv2.imwrite(output_path, mask)
    print(f"Water detection mask saved to {output_path}")

# Run the model
predict_road("backend/public/input/sat.jpg")
