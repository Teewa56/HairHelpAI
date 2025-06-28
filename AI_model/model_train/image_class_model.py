import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
import numpy as np
import matplotlib.pyplot as plt

def load_data():
    train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        zoom_range=0.2,
        horizontal_flip=True,
        validation_split=0.2 
    )
    
    train_data = train_datagen.flow_from_directory(
        '/images/train',
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        subset='training'
    )
    
    val_data = train_datagen.flow_from_directory(
        '/images/test',
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        subset='validation'
    )
    return train_data, val_data

train_data, val_data = load_data()

def build_model(num_classes=4):
    base_model = MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False
    
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

model = build_model()
model.summary()

history = model.fit(
    train_data,
    epochs=15,
    validation_data=val_data,
    callbacks=[
        tf.keras.callbacks.EarlyStopping(patience=3)
    ]
)

plt.figure(figsize=(12, 6))
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.legend()
plt.show()

test_loss, test_acc = model.evaluate(val_data)
print(f"Test Accuracy: {test_acc * 100:.2f}%")

model.save('../models/image_class_model.keras')

def predict_hair_loss(image_path):
    img = tf.keras.preprocessing.image.load_img(
        image_path, target_size=(224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    
    pred = model.predict(img_array)
    class_idx = np.argmax(pred[0])
    classes = ["Healthy", "Early Thinning", "Moderate Balding", "Advanced Loss"]
    return classes[class_idx]

print(predict_hair_loss("/images/test_image.jpg"))