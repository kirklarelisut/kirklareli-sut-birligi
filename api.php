<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS request için
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$dataFile = 'db.json';

// Veritabanı dosyasını oku
function readData() {
    global $dataFile;
    if (file_exists($dataFile)) {
        return json_decode(file_get_contents($dataFile), true);
    }
    return [];
}

// Veritabanı dosyasına yaz
function writeData($data) {
    global $dataFile;
    return file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// GET - Tüm veriyi getir
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode(readData());
    exit;
}

// POST/PUT - Veriyi güncelle
if ($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input) {
        $currentData = readData();
        
        // Gelen veriyle mevcut veriyi birleştir
        $newData = array_merge($currentData, $input);
        
        if (writeData($newData)) {
            echo json_encode(['success' => true, 'message' => 'Data updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to write data']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    }
    exit;
}

// Desteklenmeyen method
http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
?> 