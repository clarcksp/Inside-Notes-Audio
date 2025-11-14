import React, { useState, useRef } from 'react';
import { Mic, StopCircle, Send, MessageSquare, Loader2 } from 'lucide-react';

interface AudioRecorderProps {
  clienteId: number;
  onNoteAdded: (text: string, isFinal: boolean) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ clienteId, onNoteAdded }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [draftText, setDraftText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const audioChunks = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Seu navegador não suporta gravação de áudio.");
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      
      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setAudioURL(null);
      audioChunks.current = [];
    } catch (err) {
      alert(`Erro ao iniciar gravação: ${err}`);
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      setTimeout(() => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      }, 100); 
    }
  };

  const handleSendDraft = () => {
    if (draftText.trim()) {
      onNoteAdded(draftText, false);
      setDraftText('');
    }
  };
  
  const handleFinalizeAndTranscribe = async () => {
    if (!audioURL) {
      alert("Nenhum áudio para transcrever.");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulated transcription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const transcribedText = "Transcrição simulada do áudio. O cliente relatou uma questão importante sobre o serviço prestado.";
      const finalNote = `[TRANSCRIÇÃO - Cliente #${clienteId}]\n${transcribedText}`;
      
      onNoteAdded(finalNote, true);
      setAudioURL(null);
      setDraftText('');
    } catch (error) {
      console.error("Erro na transcrição:", error);
      alert(`Erro ao transcrever: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <h4 className="text-xl font-semibold text-orange-400">Gravador de Atendimento</h4>

      {/* Quick Draft */}
      <div className="flex gap-2">
        <textarea
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="Rascunho rápido ou anotação urgente..."
          rows={2}
          className="flex-grow p-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:ring-orange-500 focus:border-orange-500 text-sm resize-none"
        />
        <button
          onClick={handleSendDraft}
          disabled={!draftText.trim()}
          className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition disabled:opacity-50"
        >
          <MessageSquare size={20} />
        </button>
      </div>

      {/* Audio Controls */}
      <div className="flex justify-between items-center bg-gray-900 p-3 rounded-lg shadow-inner border border-gray-700">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isProcessing}
            className="flex items-center gap-2 p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition font-semibold disabled:opacity-50"
          >
            <Mic size={24} />
            {isProcessing ? 'Processando...' : 'Iniciar Gravação'}
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition font-semibold"
          >
            <StopCircle size={24} />
            Parar Gravação
          </button>
        )}

        {audioURL && (
          <div className="flex items-center gap-4">
            <audio controls src={audioURL} className="h-8" />
            
            <button
              onClick={handleFinalizeAndTranscribe}
              disabled={isProcessing}
              className={`flex items-center gap-2 p-2 ${isProcessing ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg transition disabled:opacity-50`}
            >
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              {isProcessing ? 'Transcrevendo...' : 'Finalizar e Transcrever'}
            </button>
          </div>
        )}
        
        {!isRecording && !audioURL && !isProcessing && (
            <span className="text-gray-500 text-sm">Pronto para gravar o atendimento.</span>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
