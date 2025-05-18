from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

Input_path = "public/Output/road_mask.jpg"
output_path = "public/Output/road_pie.jpg"

def anaylzeRoad(Input_path, Output_path) :

    # Load and resize input mask image
    image = Image.open(Input_path).convert("RGB")
    resized_image = image.resize((256, 256))  # Resize if needed
    image_np = np.array(resized_image)

    # Define the road color (gray, adjust if needed)
    road_color = np.array([128, 128, 128])

    # Create road mask
    road_mask = np.all(image_np == road_color, axis=-1)
    road_pixels = np.sum(road_mask)
    non_road_pixels = road_mask.size - road_pixels
    total_pixel = road_mask.size
    road_ratio = road_pixels / total_pixel
    percentage = road_ratio * 100

    coverage = ""
    s1 = ""
    s2 = ""
    if road_ratio < 0.03:
        coverage = f"The road coverage is very low ({percentage:.2f}%). "
        s1 = "This area likely represents undeveloped or remote land, with limited road access. "
        s2 = "Transportation and emergency access could be challenging here."
    elif road_ratio < 0.1:
        coverage = f"The road coverage is low ({percentage:.2f}%). "
        s1 = "This might correspond to a rural or semi-rural area, possibly with dirt roads or isolated access points. "
        s2 ="Infrastructure development could significantly improve connectivity."
    elif road_ratio < 0.25:
        coverage = f"Moderate road coverage detected ({percentage:.2f}%). "
        s1 = "This indicates a suburban or developing urban zone. "
        s2 = "Basic infrastructure exists, supporting residential, logistic, and emergency mobility."
    else:
        coverage = f"High road density observed ({percentage:.2f}%). "
        s1 = "The area is likely a well-developed urban or industrial region with extensive road infrastructure. "
        s2 = "This supports efficient transportation, trade, and public services."
    # ========================
    # ROAD LENGTH ESTIMATION
    # ========================

    # Constants (adjust based on your scaling)
    PIXEL_LENGTH_M = 1  # Assume each pixel represents 1 meter of road length

    # Estimate total road length
    total_road_length_m = road_pixels * PIXEL_LENGTH_M
    total_road_length_km = total_road_length_m / 1000

    # ========================
    # Pie Chart
    # ========================
    labels = ['Road Region', 'Other Regions']
    sizes = [road_pixels, non_road_pixels]
    colors = ['#bbade6', 'gray']

    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
    plt.title(f'Road vs Non-road | Est. Road Length: {total_road_length_km:.2f} km')
    plt.axis('equal')
    plt.savefig(output_path)


    return {
    "Road Pixels": road_pixels,
    "Estimated Total Road Length":total_road_length_km,
    "s1" : coverage,
    "s2" : s1,
    "s3" : s2
    }

data = anaylzeRoad(Input_path, output_path)
print(data)

    
