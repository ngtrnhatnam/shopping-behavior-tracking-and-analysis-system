import serial
import datetime

PORT = 'COM5'
BAUDRATE = 115200

try:
    ser = serial.Serial(PORT, BAUDRATE, timeout=0.1) 
    print(f"Connected ESP32 with {PORT} @ {BAUDRATE}bps")

    while True:
        if ser.in_waiting:  # Chỉ đọc khi có dữ liệu
            line = ser.readline().decode('utf-8').strip()
            if line:
                now = datetime.datetime.now()
                print(f"[ESP32]: {now}\n\t{line}\n")
                with open('ble_log.txt', 'a') as f:
                    f.write(line + '\n')

except serial.SerialException as e:
    print(f"Cannot connect ESP32: {e}")
except KeyboardInterrupt:
    print("Stopped by user <3")
    ser.close()
    exit()