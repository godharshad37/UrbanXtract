import cv2
import numpy as np
import matplotlib.pyplot as plt

def detect_green_areas(image_path, threshold=20):
    # Load image in BGR and convert to RGB
    image_bgr = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

    # Extract RGB channels
    R = image_rgb[:, :, 0].astype(float)
    G = image_rgb[:, :, 1].astype(float)
    B = image_rgb[:, :, 2].astype(float)

    # Compute Excess Green Index (ExG)
    exg = 2 * G - R - B

    # Threshold to create green mask
    green_mask = exg > threshold

    # Create an output mask image
    output = np.zeros_like(image_rgb)
    output[green_mask] = [0, 255, 0]  # Green for vegetation

    # Resize for uniform output if needed
    output_resized = cv2.resize(output, (256, 256))
    output_path = "public/Output/veg_barren_mask.jpg"
    cv2.imwrite(output_path, output_resized)
    print(f"Barren land detected. Output saved as: {output_path}")


# Example usage
INPUT_PATH = "public/Input/sat.jpg"
detect_green_areas(INPUT_PATH)
