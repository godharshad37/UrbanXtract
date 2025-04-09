from PIL import Image
import numpy as np

from PIL import Image
import numpy as np

def overlay_masks(mask_paths, output_path, target_colors=None, overlay_colors=None):
    if len(mask_paths) != 4:
        raise ValueError("Exactly four mask image paths must be provided.")
    
    if target_colors is None or len(target_colors) != 4:
        raise ValueError("Must provide 4 target colors.")
    
    if overlay_colors is None or len(overlay_colors) != 4:
        raise ValueError("Must provide 4 overlay colors.")

    # Base size from the first image
    base_image = Image.open(mask_paths[0]).convert("RGB")
    base_size = base_image.size
    h, w = base_image.size[1], base_image.size[0]
    final_np = np.zeros((h, w, 3), dtype=np.uint8)  # Start with black

    for i, path in enumerate(mask_paths):
        mask_img = Image.open(path).convert("RGB")
        if mask_img.size != base_size:
            mask_img = mask_img.resize(base_size)

        mask_np = np.array(mask_img)
        match = np.all(mask_np == target_colors[i], axis=-1)

        # Overwrite only where match is true
        for c in range(3):
            final_np[..., c][match] = overlay_colors[i][c]

    # Save final image
    final_image = Image.fromarray(final_np, mode="RGB")
    final_image.save(output_path)
    print(f"Overlay image saved at {output_path}")

mask_paths = [
    "backend/public/Output/veg_barren_mask.jpg",
    "backend/public/Output/build_mask.jpg",
    "backend/public/Output/water_mask.jpg",
    "backend/public/Output/road_mask.jpg"
]

# First color in each mask to keep
target_colors = [
    (0, 210, 0),       # veg_barren_mask
    (255, 255, 0),     # build_mask
    (173, 216, 230),   # water_mask
    (128, 128, 128)    # road_mask
]

# Overlay colors (can be same or different from above)
overlay_colors = [
    (0, 255, 0),       # bright green for vegetation
    (255, 255, 0),     # yellow for buildings
    (0, 0, 255),       # blue for water
    (128, 128, 128)    # grey for roads
]

output_path = "backend/public/Output/overlay.jpg"

overlay_masks(mask_paths, output_path, target_colors, overlay_colors)
