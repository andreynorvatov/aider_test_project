import os
from google.cloud import speech_v1p1beta1 as speech

def transcribe_audio(file_path):
    """Transcribe the given audio file."""
    client = speech.SpeechClient()

    with open(file_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="ru-RU",
    )

    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))

if __name__ == "__main__":
    file_path = "path/to/your/audio/file.wav"  # Replace with your audio file path
    transcribe_audio(file_path)
