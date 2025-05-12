from PIL import Image
import numpy as np

def overlay_masks(mask_paths, output_path, target_colors=None, overlay_colors=None):
    if len(mask_paths) != 4:
        raise ValueError("Exactly four mask image paths must be provided.")
    
    if target_colors is None or len(target_colors) != 4:
        raise ValueError("Must provide 4 target colors.")
    
    if overlay_colors is None or len(overlay_colors) != 4:
        raise ValueError("Must provide 4 overlay colors.")

    # Use size from first mask image
    base_image = Image.open(mask_paths[0]).convert("RGB")
    base_size = base_image.size
    h, w = base_image.size[1], base_image.size[0]
    
    # Start with a tan background image
    final_np = np.full((h, w, 3), fill_value=(210, 180, 140), dtype=np.uint8)

    # Reverse the mask order to give highest priority to the first mask
    for i, path in reversed(list(enumerate(mask_paths))):
        mask_img = Image.open(path).convert("RGB")
        if mask_img.size != base_size:
            mask_img = mask_img.resize(base_size)

        mask_np = np.array(mask_img)
        match = np.all(mask_np == target_colors[i], axis=-1)

        # Only update pixels that are still background
        background_mask = np.all(final_np == (210, 180, 140), axis=-1)
        final_np[np.logical_and(match, background_mask)] = overlay_colors[i]

    # Save the resulting overlay image
    final_image = Image.fromarray(final_np, mode="RGB")
    final_image.save(output_path)
    print(f"Overlay image saved at {output_path}")

# Example usage
mask_paths = [
    "backend/public/Output/veg_barren_mask.jpg",
    "backend/public/Output/build_mask.jpg",
    "backend/public/Output/water_mask.jpg",
    "backend/public/Output/road_mask.jpg"
]

# Target colors to match in each mask
target_colors = [
    (0, 210, 0),       # vegetation
    (255, 255, 0),     # buildings
    (173, 216, 230),   # water
    (128, 128, 128)    # road
]

# Output overlay colors (same as target in this case)
overlay_colors = [
    (0, 210, 0),       # green
    (255, 255, 0),     # yellow
    (173, 216, 230),   # light blue
    (128, 128, 128)    # gray
]

output_path = "backend/public/Output/overlay.jpg"

overlay_masks(mask_paths, output_path, target_colors, overlay_colors)
