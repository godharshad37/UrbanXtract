import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load the image
image = cv2.imread('public/Input/sat.jpg')

# Convert the image from BGR to RGB (OpenCV loads images in BGR by default)
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Separate the RGB channels
r_channel = image_rgb[:, :, 0]
g_channel = image_rgb[:, :, 1]
b_channel = image_rgb[:, :, 2]

# Compute NDWI (Water Index)
NDWI = (g_channel - b_channel) / (g_channel + b_channel + 1e-5)

# Compute NDVI (Vegetation Index)
NDVI = (g_channel - r_channel) / (g_channel + r_channel + 1e-5)  # Add small value to avoid division by zero


# Apply a threshold to detect water (using the blue channel)
# Pixels with higher blue values compared to red and green are considered water
water_mask = (b_channel > r_channel) & (b_channel > g_channel) & (g_channel > r_channel) & (NDWI > 0.05) & (NDVI > 0.3) & (g_channel < 60)


# Convert the mask to uint8 format for visualization
water_mask = water_mask.astype(np.uint8) * 255

# Optionally, apply some morphological operations to refine the mask
kernel = np.ones((5, 5), np.uint8)
water_mask = cv2.morphologyEx(water_mask, cv2.MORPH_CLOSE, kernel)  # Close small holes
#water_mask = cv2.morphologyEx(water_mask, cv2.MORPH_OPEN, kernel)   # Remove small noise

# Save the water detection mask to the public/output folder
output_path = 'public/Output/water_mask.jpg'
cv2.imwrite(output_path, water_mask)

print(output_path)