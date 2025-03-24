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
    # Analyze grid to get water coverage percentages
    grid_data = analyze_grid(mask_path)
    print(grid_data)
    # Create a heatmap representation
    coverage_values = np.array(list(grid_data.values())).reshape(3, 3)

    fig, ax = plt.subplots()
    im = ax.imshow(coverage_values, cmap='Blues', vmin=0, vmax=100)

    # Add percentage text in cells
    for i in range(3):
        for j in range(3):
            text = ax.text(j, i, f"{coverage_values[i, j]:.1f}%", 
                           ha="center", va="center", color="black")

    # Set labels
    ax.set_xticks(np.arange(3))
    ax.set_yticks(np.arange(3))
    ax.set_xticklabels(["Left", "Center", "Right"])
    ax.set_yticklabels(["Top", "Middle", "Bottom"])

    plt.colorbar(im, label="Water Coverage (%)")
    plt.title("Water Coverage Heatmap")

    # Save the plot as a JPG file
    plt.savefig(output_path, format='jpg', dpi=300)
    #plt.close()  # Close figure to free memory

    #print(f"📷 Graph saved as: {output_path}")
    return grid_data

# Example Usage
mask_path = sys.argv[1]
output_path = sys.argv[2] 

save_grid_chart(mask_path, output_path)
