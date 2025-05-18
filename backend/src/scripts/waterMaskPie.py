from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

Input_path = "public/Output/water_mask.jpg"
output_path = "public/Output/water_pie.jpg"

def analyzeWater(Input_path, Output_path):
    image = Image.open(Input_path).convert("RGB")
    resized_image = image.resize((256, 256))
    image_np = np.array(resized_image)

    # Define water color
    water_color = np.array([173, 216, 230])
    tolerance = 10  # Allow variation due to JPEG compression

    # Create mask with color distance tolerance
    color_diff = np.abs(image_np - water_color)
    water_mask = np.all(color_diff <= tolerance, axis=-1)

    water_pixels = np.sum(water_mask)
    non_water_pixels = water_mask.size - water_pixels
    total_pixels = water_mask.size
    water_ratio = water_pixels / total_pixels
    percentage = water_ratio * 100

    s1 = ""
    s2 = ""
    s3 = ""
    s4 = ""
    if water_ratio < 0.01:
        s1 = f"Very minimal surface water detected ({percentage:.2f}%). "
        s2 = "This suggests an arid region with little to no standing water. "
        s3 = "Water conservation methods and rainwater harvesting should be prioritized."
    elif water_ratio < 0.05:
        s1 = f"Low water coverage found ({percentage:.2f}%). "
        s2 = "Water bodies are likely small lakes or ponds. "
        s3 = "Useful for local irrigation or livestock, but may not sustain a large population."
    elif water_ratio < 0.2:
        s1 = f"Moderate water availability ({percentage:.2f}%). "
        s2 = "The area includes substantial water bodies such as reservoirs or rivers. "
        s3 = "Supports small-scale agriculture, fisheries, and rural communities."
    else:
        s1 = f"High water body coverage ({percentage:.2f}%). "
        s2 = "The region likely contains lakes, large rivers, or wetlands. "
        s3 = "Suitable for irrigation, drinking water, biodiversity, and urban supply. "
        s4 = "Conservation efforts should ensure sustainability of this critical resource."


    # Groundwater estimation
    PIXEL_AREA_M2 = 100
    AVG_WATER_DEPTH_M = 2
    DAILY_NEED_LITERS = 50
    DAYS = 365
    LITERS_PER_CUBIC_METER = 1000

    ground_water_volume_m3 = water_pixels * PIXEL_AREA_M2 * AVG_WATER_DEPTH_M
    ground_water_volume_liters = ground_water_volume_m3 * LITERS_PER_CUBIC_METER
    population_supported = int(ground_water_volume_liters / (DAILY_NEED_LITERS * DAYS))

    # Pie Chart
    labels = ['Water Region', 'Other Regions']
    sizes = [water_pixels, non_water_pixels]
    colors = ['#ADD8E6', 'gray']

    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
    plt.title(f'Water vs Land | Est. Population Supported: {population_supported}')
    plt.axis('equal')
    plt.savefig(Output_path, format='jpg')

    return { 
        "Water Pixels": water_pixels,
        "Estimated Ground Water Volume (L)": ground_water_volume_liters,
        "Estimated Population Supported (1 year)": population_supported,
        "s1" : s1,
        "s2" : s2, 
        "s3" : s3,
        "s4" : s4
    }

data = analyzeWater(Input_path, output_path)
print(data)
