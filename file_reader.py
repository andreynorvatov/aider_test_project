import whisper

def transcribe_audio(audio_path):
    # Load the Whisper model
    model = whisper.load_model("base")

    # Transcribe the audio file
    result = model.transcribe(audio_path)

    return result["text"]

if __name__ == "__main__":
    import sys
    audio_path = sys.argv[1]
    transcription = transcribe_audio(audio_path)
    print(transcription)
