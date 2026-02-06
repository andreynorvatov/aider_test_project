import whisper

def transcribe_audio(audio_path):
    # Load the Whisper model from a specific local directory
    model = whisper.load_model("turbo", model_dir="/Users/andrey_norvatov/.lmstudio/models/mlx-community/whisper-large-v3-turbo")

    # Transcribe the audio file
    result = model.transcribe(audio_path)

    return result["text"]

if __name__ == "__main__":
    import sys
    audio_path = "data/2026-02-06 15.51.05.ogg"
    transcription = transcribe_audio(audio_path)
    print(transcription)
