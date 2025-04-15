import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import os

# Define RGB values
COLORS = {
    'urban_land': (255, 255, 0),     # Yellow
    'road':       (128, 128, 128),   # Gray
    'water':      (173, 216, 230),   # Light Blue
    'vegetation': (0, 210, 0)        # Green
}

def load_rgb_mask(path):
    """Load an RGB mask image as a NumPy array."""
    return np.array(Image.open(path).convert('RGB'))

def count_class_pixels(mask, target_color):
    """Count pixels matching a specific color."""
    return int(np.sum(np.all(mask == target_color, axis=-1)))

def compare_land_masks(urban_path, road_path, water_path, veg_path, output_chart_path):
    # Load masks
    urban_mask = load_rgb_mask(urban_path)
    road_mask = load_rgb_mask(road_path)
    water_mask = load_rgb_mask(water_path)
    veg_mask = load_rgb_mask(veg_path)

    # Assume all masks have the same shape
    shape = urban_mask.shape[:2]
    total_pixels = shape[0] * shape[1]

    # Count class pixels
    urban_pixels = count_class_pixels(urban_mask, COLORS['urban_land'])
    road_pixels = count_class_pixels(road_mask, COLORS['road'])
    water_pixels = count_class_pixels(water_mask, COLORS['water'])
    veg_pixels = count_class_pixels(veg_mask, COLORS['vegetation'])

    # Calculate other pixels (everything else)
    combined_mask = np.zeros(shape, dtype=bool)
    for mask in [urban_mask, road_mask, water_mask, veg_mask]:
        for color in COLORS.values():
            combined_mask |= np.all(mask == color, axis=-1)
    other_pixels = total_pixels - np.sum(combined_mask)

    # Flat result dictionary
    comparison = {
        'urban_pixel_count': urban_pixels,
        'road_pixel_count': road_pixels,
        'water_pixel_count': water_pixels,
        'vegetation_pixel_count': veg_pixels,
        'other_pixel_count': int(other_pixels),
        'urban_vs_water_ratio': round(urban_pixels / water_pixels, 2) if water_pixels else 'undefined',
        'road_to_urban_ratio': round(road_pixels / urban_pixels, 2) if urban_pixels else 'undefined',
        'vegetation_percent_of_total': round((veg_pixels / total_pixels) * 100, 2),
        'urban_insight': "Urban areas detected. Encourage green infrastructure to counteract heat and pollution." if urban_pixels else "No urban presence.",
        'road_insight': "Road infrastructure identified. Consider using permeable materials and planting buffers." if road_pixels else "No road network found.",
        'water_insight': "Water bodies found. Potential for improving local groundwater recharge and biodiversity." if water_pixels else "No significant water bodies detected.",
        'vegetation_insight': "Vegetation present. Valuable for oxygen production, biodiversity, and climate resilience." if veg_pixels else "No vegetation area found."
    }

    # Dominance insight
    segment_pixels = {
        'urban_land': urban_pixels,
        'road': road_pixels,
        'water': water_pixels,
        'vegetation': veg_pixels
    }
    dominant_class = max(segment_pixels, key=segment_pixels.get)
    dominance_message = {
        'urban_land': "Urban sprawl dominates—prioritize sustainable land use policies.",
        'road': "Road networks dominate—review infrastructure sustainability.",
        'water': "Water presence is dominant—preserve and monitor quality.",
        'vegetation': "Vegetation dominates—preserve green cover for ecological balance."
    }
    comparison['land_dominance'] = dominance_message[dominant_class]

    # ---------- Pie Chart ----------
    labels = ['Urban', 'Road', 'Water', 'Vegetation', 'Other']
    sizes = [urban_pixels, road_pixels, water_pixels, veg_pixels, other_pixels]
    colors = ['yellow', 'gray', 'lightblue', 'green', 'lightgray']

    plt.figure(figsize=(8, 6))
    wedges, texts, autotexts = plt.pie(
        sizes,
        labels=labels,
        colors=colors,
        startangle=90,
        autopct='%1.1f%%',
        wedgeprops={'edgecolor': 'black'},
        textprops={'fontsize': 10},
        pctdistance=0.85,     # Push percentages outside the center
        labeldistance=1.1     # Push labels slightly outward
    )

    # Improve visibility
    for autotext in autotexts:
        autotext.set_color('black')
        autotext.set_fontsize(9)

    plt.title('Land Use Distribution', fontsize=14)
    plt.axis('equal')
    # Save chart
    plt.savefig(output_chart_path)

    return comparison

urban_path = "public/Output/build_mask.jpg"
road_path = "public/Output/road_mask.jpg"
water_path = "public/Output/water_mask.jpg"
veg_path = "public/Output/veg_barren_mask.jpg"
output_path = "public/Output/landAnalyze_pie.jpg"
data = compare_land_masks(urban_path, road_path, water_path, veg_path, output_path)
print(data)