import cv2
import numpy as np
import os
from PIL import Image

def crop_grid_image(image_path, output_folder, margin=40):
    # 1. Wczytanie obrazu
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f'Nie można wczytać obrazu: {image_path}')
        return

    # 2. Konwersja do skali szarości i progowanie (znajdowanie konturów)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)

    # 3. Znajdowanie konturów
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 4. Filtracja konturów (odrzucamy zbyt małe, np. szumy)
    valid_contours = [c for c in contours if cv2.contourArea(c) > 5000]

    # 5. Sortowanie konturów od lewej do prawej, potem od góry do dołu
    # Najpierw grupujemy je według środka Y (rzędy), potem sortujemy X w każdym rzędzie
    bounding_boxes = [cv2.boundingRect(c) for c in valid_contours]
    
    # Sortowanie: najpierw Y, potem X
    bounding_boxes.sort(key=lambda b: (b[1] // 250, b[0])) # 250 to przybliżona wysokość rzędu

    # 6. Zapisanie każdego wycięcia
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    rarity_names = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'reserved', 'reserved']

    for i, (x, y, w, h) in enumerate(bounding_boxes):
        if i >= len(rarity_names):
            break

        # Dodajemy margines, pilnując, żeby nie wyjść poza obraz
        x1 = max(0, x - margin)
        y1 = max(0, y - margin)
        x2 = min(img.shape[1], x + w + margin)
        y2 = min(img.shape[0], y + h + margin)

        cropped = img[y1:y2, x1:x2]

        # Konwersja z BGR (OpenCV) na RGB (PIL)
        cropped_rgb = cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(cropped_rgb)

        # Zapis jako WebP z przezroczystością (jeśli oryginał miał kanał alfa)
        # W tym przypadku zakładamy, że tło jest szare, więc nie ma alfa.
        # Ale dla bezpieczeństwa zapisujemy jako PNG, a potem konwertujemy.
        filename = f'human_warrior_{rarity_names[i]}_idle.png'
        pil_img.save(os.path.join(output_folder, filename))
        print(f'Zapisano: {filename}')

    print(f'Gotowe! Wycięto {len(bounding_boxes)} postaci.')

# Uruchomienie
# Zmień ścieżkę na lokalizację twojego obrazka z ChatGPT
crop_grid_image('input_grid.jpg', 'wyciete_assetty')
