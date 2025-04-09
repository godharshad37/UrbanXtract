import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, Model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Conv2DTranspose, Input, concatenate
from tensorflow.keras.models import Model
import cv2

# 1. Define the U-Net architecture
def unet_model(input_size=(256, 256, 3)):
    inputs = Input(input_size)
    
    c1 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(inputs)
    c1 = layers.BatchNormalization()(c1)
    c1 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(c1)
    c1 = layers.BatchNormalization()(c1)
    p1 = layers.MaxPooling2D((2, 2))(c1)
    p1 = layers.Dropout(0.2)(p1)

    c2 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(p1)
    c2 = layers.BatchNormalization()(c2)
    c2 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(c2)
    c2 = layers.BatchNormalization()(c2)
    p2 = layers.MaxPooling2D((2, 2))(c2)
    p2 = layers.Dropout(0.2)(p2)

    c3 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(p2)
    c3 = layers.BatchNormalization()(c3)
    c3 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(c3)
    c3 = layers.BatchNormalization()(c3)
    p3 = layers.MaxPooling2D((2, 2))(c3)
    p3 = layers.Dropout(0.3)(p3)

    c4 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(p3)
    c4 = layers.BatchNormalization()(c4)
    c4 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(c4)
    c4 = layers.BatchNormalization()(c4)
    p4 = layers.MaxPooling2D((2, 2))(c4)
    p4 = layers.Dropout(0.3)(p4)

    c5 = layers.Conv2D(1024, (3, 3), activation='relu', padding='same')(p4)
    c5 = layers.BatchNormalization()(c5)
    c5 = layers.Conv2D(1024, (3, 3), activation='relu', padding='same')(c5)
    c5 = layers.BatchNormalization()(c5)

    u1 = layers.UpSampling2D((2, 2))(c5)
    u1 = concatenate([u1, c4])
    c6 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(u1)
    c6 = layers.BatchNormalization()(c6)
    c6 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(c6)
    c6 = layers.BatchNormalization()(c6)

    u2 = layers.UpSampling2D((2, 2))(c6)
    u2 = concatenate([u2, c3])
    c7 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(u2)
    c7 = layers.BatchNormalization()(c7)
    c7 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(c7)
    c7 = layers.BatchNormalization()(c7)

    u3 = layers.UpSampling2D((2, 2))(c7)
    u3 = concatenate([u3, c2])
    c8 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(u3)
    c8 = layers.BatchNormalization()(c8)
    c8 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(c8)
    c8 = layers.BatchNormalization()(c8)

    u4 = layers.UpSampling2D((2, 2))(c8)
    u4 = concatenate([u4, c1])
    c9 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(u4)
    c9 = layers.BatchNormalization()(c9)
    c9 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(c9)
    c9 = layers.BatchNormalization()(c9)

    outputs = layers.Conv2D(1, (1, 1), activation='sigmoid')(c9)

    return Model(inputs=inputs, outputs=outputs)

# 2. Build and load weights
model = unet_model()
model.load_weights('src/model_ml/cp.weights.h5')

# 3. Preprocess image
def preprocess_image(image_path, img_size=(256, 256)):
    image = cv2.imread(image_path)
    image = cv2.resize(image, img_size)
    image = image / 255.0
    return np.expand_dims(image, axis=0)

# 4. Predict and save mask as light blue & black
image_path = "public/input/sat.jpg"  
image = preprocess_image(image_path)
pred_mask = model.predict(image)[0, :, :, 0]
binary_mask = (pred_mask > 0.5).astype(np.uint8)

# Create an RGB image with light blue (173, 216, 230) and black (0, 0, 0)
light_blue = [173, 216, 230]
mask_rgb = np.zeros((binary_mask.shape[0], binary_mask.shape[1], 3), dtype=np.uint8)
mask_rgb[binary_mask == 1] = light_blue  # water
mask_rgb[binary_mask == 0] = [0, 0, 0]   # background

# Save the output
output_path = "public/Output/water_mask.jpg"
cv2.imwrite(output_path, cv2.cvtColor(mask_rgb, cv2.COLOR_RGB2BGR))
