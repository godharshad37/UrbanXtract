from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

Input_path = "public/Output/water_mask.jpg"
output_path = "public/Output/water_pie.jpg"
# Load and resize input mask image
def anazlyeWater(Input_path, Output_path) :
    image = Image.open(Input_path).convert("RGB")
    resized_image = image.resize((256, 256))  # Resize if needed
    image_np = np.array(resized_image)

    # Define the water color (blue)
    water_color = np.array([0, 0, 255])

    # Create mask
    water_mask = np.all(image_np == water_color, axis=-1)
    water_pixels = np.sum(water_mask)
    non_water_pixels = water_mask.size - water_pixels

    # ========================
    # GROUND WATER ESTIMATION
    # ========================

    # Constants (adjust based on real-world assumptions)
    PIXEL_AREA_M2 = 100        # 1 pixel = 100 m² (example)
    AVG_WATER_DEPTH_M = 2      # average depth of surface water in meters
    DAILY_NEED_LITERS = 50     # per person per day
    DAYS = 365                 # for 1 year
    LITERS_PER_CUBIC_METER = 1000

    # Calculate total volume in cubic meters
    ground_water_volume_m3 = water_pixels * PIXEL_AREA_M2 * AVG_WATER_DEPTH_M
    ground_water_volume_liters = ground_water_volume_m3 * LITERS_PER_CUBIC_METER

    # Estimate number of people supported for 1 year
    population_supported = int(ground_water_volume_liters / (DAILY_NEED_LITERS * DAYS))

    # ========================
    # Pie Chart
    # ========================
    labels = ['Water Region', 'Other Regions']
    sizes = [water_pixels, non_water_pixels]
    colors = ['blue', 'gray']

    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
    plt.title(f'Water vs Land | Est. Population Supported: {population_supported}')
    plt.axis('equal')
    plt.savefig(output_path, format='jpg')

    data = {}
    data["Water Pixels"] = water_pixels
    data["Estimated Ground Water Volume"] = ground_water_volume_liters
    data["Estimated Population Supported (1 year)"] = population_supported
    return data

anazlyeWater(Input_path, output_path)