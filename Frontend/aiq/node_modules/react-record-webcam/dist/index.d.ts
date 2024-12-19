type ByIdDevice = {
    label: string;
    type: 'videoinput' | 'audioinput';
};
type ById = Record<string, ByIdDevice>;
type ByLabelDevice = {
    label: string;
    deviceId: string;
};
type ByType = {
    video: ByLabelDevice[];
    audio: ByLabelDevice[];
};
type InitialDevice = {
    deviceId: string;
    label: string;
};
type InitialDevices = {
    video: InitialDevice | null;
    audio: InitialDevice | null;
};
type Devices = {
    devicesByType: ByType;
    devicesById: ById;
    initialDevices: InitialDevices;
};
declare function getDevices(): Promise<Devices>;

declare const ERROR_MESSAGES: {
    readonly CODEC_NOT_SUPPORTED: "CODEC_NOT_SUPPORTED";
    readonly SESSION_EXISTS: "SESSION_EXISTS";
    readonly NO_RECORDING_WITH_ID: "NO_RECORDING_WITH_ID";
    readonly NO_USER_PERMISSION: "NO_USER_PERMISSION";
};
declare const STATUS: {
    readonly INITIAL: "INITIAL";
    readonly CLOSED: "CLOSED";
    readonly OPEN: "OPEN";
    readonly RECORDING: "RECORDING";
    readonly STOPPED: "STOPPED";
    readonly ERROR: "ERROR";
    readonly PAUSED: "PAUSED";
};
type Status = keyof typeof STATUS;
type Recording = {
    /**
     * @property {string} id - The ID of the recording.
     */
    id: string;
    /**
     * @property {string} id - The ID of the audio device.
     */
    audioId: string;
    /**
     * @property {string} [audioLabel] - The label of the audio device.
     */
    audioLabel?: string;
    /**
     * @property {Blob} [blob] - The blob of the recording.
     */
    blob?: Blob;
    /**
     * @property {Blob[]} blobChunks - Single blob or chunks per timeslice of the recording.
     */
    blobChunks: Blob[];
    /**
     * @property {string} fileName - The name of the file.
     */
    fileName: string;
    /**
     * @property {string} fileType - The type of the file.
     */
    fileType: string;
    /**
     * @property {boolean} isMuted - Whether the recording is muted.
     */
    isMuted: boolean;
    /**
     * @property {string} mimeType - The MIME type of the recording.
     */
    mimeType: string;
    /**
     * @property {string | null} objectURL - The object URL of the recording.
     */
    objectURL: string | null;
    /**
     * @property {React.RefObject<HTMLVideoElement>} previewRef - React Ref for the preview element.
     */
    previewRef: React.RefObject<HTMLVideoElement>;
    /**
     * @property {MediaRecorder | null} recorder - The MediaRecoder instance of the recording.
     */
    recorder: MediaRecorder | null;
    /**
     * @property {Status} status - The status of the recording.
     */
    status: Status;
    /**
     * @property {string} videoId - The ID of the video device.
     */
    videoId: string;
    /**
     * @property {string} [videoLabel] - The label of the video device.
     */
    videoLabel?: string;
    /**
     * @property {React.RefObject<HTMLVideoElement>} webcamRef - React Ref for the webcam element.
     */
    webcamRef: React.RefObject<HTMLVideoElement>;
};

type UseRecorder = {
    /**
     * Array of active recordings.
     */
    activeRecordings: Recording[];
    /**
     * Clears all active recordings.
     * @returns A promise that resolves when all recordings are cleared.
     */
    clearAllRecordings: () => Promise<void>;
    /**
     * Applies recording options to a specific recording.
     * @param {string} recordingId - The ID of the recording.
     * @returns {Promise<Recording | void>} - A promise that resolves to a Recording object or void.
     */
    applyRecordingOptions: (recordingId: string) => Promise<Recording | void>;
    /**
     * Cancels the current recording session.
     * @param recordingId The ID of the recording to cancel.
     * @returns A promise that resolves when the recording is canceled.
     */
    cancelRecording: (recordingId: string) => Promise<void>;
    /**
     * Clears the preview of a specific recording.
     * @param {string} recordingId - The ID of the recording.
     * @returns {Promise<Recording | void>} - A promise that resolves to a Recording object or void.
     */
    clearPreview: (recordingId: string) => Promise<Recording | void>;
    /**
     * Downloads a specific recording.
     * @param {string} recordingId - The ID of the recording.
     * @returns {Promise<void>} - A promise that resolves when the download is complete.
     */
    download: (recordingId: string) => Promise<void>;
    /**
     * Pauses the current recording.
     * @param recordingId The ID of the recording to pause.
     * @returns A promise that resolves with the updated recording, or void if an error occurs.
     */
    pauseRecording: (recordingId: string) => Promise<Recording | void>;
    /**
     * Resumes a paused recording.
     * @param recordingId The ID of the recording to resume.
     * @returns A promise that resolves with the updated recording, or void if an error occurs.
     */
    resumeRecording: (recordingId: string) => Promise<Recording | void>;
    /**
     * Starts a new recording session.
     * @param recordingId The ID for the new recording session.
     * @returns A promise that resolves with the new recording, or void if an error occurs.
     */
    startRecording: (recordingId: string) => Promise<Recording | void>;
    /**
     * Stops the current recording session.
     * @param recordingId The ID of the recording to stop.
     * @returns A promise that resolves with the stopped recording, or void if an error occurs.
     */
    stopRecording: (recordingId: string) => Promise<Recording | void>;
    /**
     * Mutes or unmutes the recording audio.
     * @param recordingId The ID of the recording to mute or unmute.
     * @returns A promise that resolves with the updated recording, or void if an error occurs.
     */
    muteRecording: (recordingId: string) => Promise<Recording | void>;
    /**
     * Creates a new recording session with specified video and audio sources.
     * @param videoId The ID of the video source device.
     * @param audioId The ID of the audio source device.
     * @returns A promise that resolves with the created recording, or void if an error occurs.
     */
    createRecording: (videoId?: string, audioId?: string) => Promise<Recording | void>;
};

type UseCamera = {
    /**
     * Applies given constraints to the camera for a specific recording.
     * @param recordingId The ID of the recording to apply constraints to.
     * @param constraints The new constraints to apply to the camera.
     * @returns A promise resolving to the updated recording or void if an error occurs.
     */
    applyConstraints: (recordingId: string, constraints: MediaTrackConstraints) => Promise<Recording | void>;
    /**
     * Closes the camera for a specific recording.
     * @param recordingId The ID of the recording for which to close the camera.
     * @returns A promise resolving to the updated recording or void if an error occurs.
     */
    closeCamera: (recordingId: string) => Promise<Recording | void>;
    /**
     * Opens the camera for a specific recording with optional constraints.
     * @param recordingId The ID of the recording for which to open the camera.
     * @returns A promise resolving to the updated recording or void if an error occurs.
     */
    openCamera: (recordingId: string) => Promise<Recording | void>;
};

/**
 * Options for customizing the recording settings.
 */
type Options = {
    /** The name of the output file. */
    fileName: string;
    /** The MIME type of the output file. */
    fileType: string;
    /** The time interval (in milliseconds) for splitting the recording into chunks. */
    timeSlice: number;
};
/**
 * Configuration options for the `useRecordWebcam` hook.
 */
type UseRecordWebcamArgs = {
    /** Media track constraints for the camera. */
    mediaTrackConstraints?: Partial<MediaTrackConstraints>;
    /** Options for the MediaRecorder API. */
    mediaRecorderOptions?: Partial<MediaRecorderOptions>;
    /** Custom options for recording. */
    options?: Partial<Options>;
};
/**
 * @typedef {Object} UseRecordWebcam
 * The return type of `useRecordWebcam`, providing access to webcam recording functionalities.
 */
type UseRecordWebcam = {
    /** Array of active recordings. */
    activeRecordings: Recording[];
    /** Function to clear all recordings. */
    clearAllRecordings: () => Promise<void>;
    /** Function to clear the current error message. */
    clearError: () => void;
    /** Object containing devices by their ID. */
    devicesById: ById | undefined;
    /** Object categorizing devices by their type. */
    devicesByType: ByType | undefined;
    /** The current error message, if any, related to recording. */
    errorMessage: string | null;
} & UseCamera & UseRecorder;
/**
 * React Record Webcam hook.
 * @param args Configuration options for the hook.
 * @returns {UseRecordWebcam} providing access to webcam recording functionalities.
 */
declare function useRecordWebcam({ mediaRecorderOptions, mediaTrackConstraints, options, }?: Partial<UseRecordWebcamArgs>): UseRecordWebcam;

/**
 * Check if the browser supports the codec for recording
 * @param {string} codec - The codec to check
 * @returns {boolean} - Whether the codec is supported
 */
declare function checkRecordingCodecSupport(codec: string): boolean;
/**
 * Check if the browser supports the video codec for playback
 * @param {string} codec - The codec to check
 * @returns {boolean} - Whether the codec is supported
 */
declare function checkVideoCodecPlaybackSupport(codec: string): boolean;
/**
 * Check if the browser supports the audio codec for playback
 * @param {string} codec - The codec to check
 * @returns {boolean} - Whether the codec is supported
 */
declare function checkAudioCodecPlaybackSupport(codec: string): boolean;
type SupportedMedia = {
    mimeType: string[];
    codec: string[];
    container: string[];
};
declare const supportedAudioCodecs: SupportedMedia;
declare const supportedVideoCodecs: SupportedMedia;
declare const defaultCodec: string;

export { type ById, type ByType, type Devices, ERROR_MESSAGES, type InitialDevices, type Options, STATUS, type UseRecordWebcam, type UseRecordWebcamArgs, checkAudioCodecPlaybackSupport, checkRecordingCodecSupport, checkVideoCodecPlaybackSupport, defaultCodec, getDevices, supportedAudioCodecs, supportedVideoCodecs, useRecordWebcam };
