import cv2
import numpy as np
import matplotlib.pyplot as plt
import sys

def analyze_grid(mask_path):
    # Load the mask
    mask = cv2.imread(mask_path, cv2.IMREAD_GRAYSCALE)

    # Debug: Check if image is loaded correctly
    if mask is None:
        raise FileNotFoundError(f"Error: Unable to load image. Check the file path: {mask_path}")

    h, w = mask.shape

    # Define grid size (3x3)
    grid_h, grid_w = h // 3, w // 3

    # Define directional labels
    directions = [
        "NW", "N", "NE",
        "W", "C", "E",
        "SW", "S", "SE"
    ]

    grid_data = {}  # Store region-wise data

    # Iterate through 3x3 grid
    for i in range(3):
        for j in range(3):
            # Extract grid section
            x_start, y_start = j * grid_w, i * grid_h
            grid_section = mask[y_start:y_start + grid_h, x_start:x_start + grid_w]

            # Count white pixels (water areas)
            total_pixels = grid_section.size
            water_pixels = np.count_nonzero(grid_section)
            coverage = (water_pixels / total_pixels) * 100

            # Store in dictionary
            region_name = directions[i * 3 + j]
            grid_data[region_name] = coverage

    return grid_data

def save_grid_chart(mask_path, output_path):
    # Analyze grid to get water coverage percentages
    grid_data = analyze_grid(mask_path)
    print(grid_data)
    # Save the plot as a JPG file
    plt.savefig(output_path, format='jpg', dpi=300)
    print(f"📷 Graph saved as: {output_path}")
    return grid_data

# Example Usage
mask_path = sys.argv[1]
output_path = "public/output/water_graph.jpg"  # Output image file

save_grid_chart(mask_path, output_path)
