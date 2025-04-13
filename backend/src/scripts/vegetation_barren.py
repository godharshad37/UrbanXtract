import cv2
import numpy as np
from matplotlib import pyplot as plt

def detect_barren_land_from_rgb(image_path, ndvi_threshold=0.3):
    # Load RGB image
    image = cv2.imread(image_path)

    # Convert BGR to RGB
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Extract Red and Blue channels
    red = image_rgb[:, :, 0].astype(float)
    blue = image_rgb[:, :, 2].astype(float)

    # Calculate pseudo-NDVI (approximation)
    pseudo_ndvi = (red - blue) / (red + blue + 1e-6)

    # Create output image
    height, width = pseudo_ndvi.shape
    output = np.zeros((height, width, 3), dtype=np.uint8)

    # Define skin color in RGB (light tan)
    green = [0, 210, 0]  # (R, G, B)

    # Apply color based on threshold
    barren_mask = pseudo_ndvi < ndvi_threshold
    output[barren_mask] = green  # Barren → skin color
    output[~barren_mask] = [0, 0, 0]   # Others → skin

    # Save output image
    output_bgr = cv2.cvtColor(output, cv2.COLOR_RGB2BGR)
    output_bgr = cv2.resize(output_bgr, (256, 256))
    output_path = "public/Output/veg_barren_mask.jpg"
    cv2.imwrite(output_path, output_bgr)
    print(f"Barren land detected. Output saved as: {output_path}")

# Example usage:
INPUT_PATH = "public/Input/sat.jpg"
detect_barren_land_from_rgb(INPUT_PATH)
