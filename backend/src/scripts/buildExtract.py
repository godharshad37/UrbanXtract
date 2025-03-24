import numpy as np
import tensorflow as tf
import cv2
import matplotlib.pyplot as plt
from PIL import Image

# Load the trained model
model = tf.keras.models.load_model("src/model_ml/build.h5")  

# Function to make a prediction on an image
def predict_image(image_path):
    threshold = 0.5  # Set the decision threshold
    
    img = Image.open(image_path)
    img = img.resize((128, 128), Image.LANCZOS)
    np_img = np.array(img)
    
    np_img = np.array([np_img])
    # Make a prediction
    pred = model.predict(np_img)
    pred = (pred > threshold).astype(np.uint8)  # Apply threshold
    
    output_path = "public/Output/build_mask.jpg"
    pred_img = Image.fromarray(pred.squeeze() * 255)  # Convert to image, scale to 255
    pred_img.save(output_path, format="JPEG")
    

# Example usage
image_path = "public/Input/sat.jpg" 
predict_image(image_path)