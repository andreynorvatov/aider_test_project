import mlx_whisper
import os


def transcribe_audio(audio_path, language="ru"):
    """
    Транскрибирует аудиофайл с помощью MLX Whisper
    language: язык для транскрипции (по умолчанию русский)
    """
    try:
        # Указываем русский язык и задачу транскрипции
        result = mlx_whisper.transcribe(
            audio_path,
            language=language,  # Указываем язык
            task="transcribe",  # Задача: транскрипция (не перевод)
            verbose=True  # Показывать прогресс

        )
        return result["text"]
    except Exception as e:
        print(f"Ошибка: {e}")
        return None


if __name__ == "__main__":
    audio_path = "data/2026-02-06 15.51.05.ogg"

    # Проверяем, существует ли файл
    if not os.path.exists(audio_path):
        print(f"Файл не найден: {audio_path}")
    else:
        print(f"Файл найден: {audio_path}")
        print("Начинаю транскрипцию на русском языке...")

        transcription = transcribe_audio(audio_path, language="ru")

        if transcription:
            print("\n" + "=" * 50)
            print("РЕЗУЛЬТАТ ТРАНСКРИПЦИИ:")
            print("=" * 50)
            print(transcription)
        else:
            print("Не удалось выполнить транскрипцию")