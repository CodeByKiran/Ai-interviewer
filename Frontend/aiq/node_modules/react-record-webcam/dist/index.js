import { useState, useEffect, useMemo, useCallback, createRef } from 'react';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function createStore(store2) {
  return (stateUpdater, callbacks) => {
    return new Proxy(store2, {
      get(target, prop, receiver) {
        if (prop === "size") {
          return target.size;
        }
        const value = Reflect.get(target, prop, receiver);
        if (value instanceof Function) {
          return function(...args) {
            var _a2;
            const result = value.apply(target, args);
            const shouldTriggerUpdate = args[args.length - 1] === true;
            if (shouldTriggerUpdate) {
              stateUpdater((prev) => prev + 1);
            }
            if (prop === "set") {
              return result.get(args[0]);
            }
            if (callbacks && callbacks[prop]) {
              (_a2 = callbacks[prop]) == null ? void 0 : _a2.call(callbacks, result);
            }
            return result;
          };
        }
        return value;
      }
    });
  };
}
function useStore(store2, callbacks) {
  const [, forceUpdate] = useState(0);
  const triggerUpdate = useCallback(() => forceUpdate((prev) => prev + 1), []);
  const state = useMemo(() => store2(triggerUpdate, callbacks), []);
  return {
    state
  };
}

// src/codec.ts
function checkRecordingCodecSupport(codec) {
  if (typeof MediaRecorder === "undefined")
    return false;
  return MediaRecorder.isTypeSupported(codec);
}
function checkVideoCodecPlaybackSupport(codec) {
  const video = document.createElement("video");
  const canPlay = video.canPlayType(codec);
  return canPlay === "maybe" || canPlay === "probably" ? true : false;
}
function checkAudioCodecPlaybackSupport(codec) {
  const audio = document.createElement("audio");
  const canPlay = audio.canPlayType(codec);
  return canPlay === "maybe" || canPlay === "probably" ? true : false;
}
var audioContainers = [
  "ogg",
  "aac",
  "flac",
  "wav",
  "mp4"
];
var videoContainers = [
  "webm",
  "mp4",
  "x-matroska",
  "3gpp",
  "3gpp2",
  "3gp2",
  "quicktime",
  "mpeg"
];
var audioCodecs = ["opus", "pcm", "aac", "mp4a"];
var videoCodecs = [
  "vp9",
  "vp8",
  "avc1",
  "av1",
  "h265",
  "h.264",
  "h264",
  "mpeg"
];
function getSupportedMediaFormats(containers, codecs, type) {
  return containers.reduce(
    (acc, container) => {
      codecs.forEach((codec) => {
        const mimeType = `${type}/${container};codecs=${codec}`;
        if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(mimeType)) {
          acc.mimeType.push(mimeType);
          acc.codec.push(codec);
          acc.container.push(container);
        }
      });
      return acc;
    },
    { mimeType: [], codec: [], container: [] }
  );
}
var supportedAudioCodecs = getSupportedMediaFormats(
  audioContainers,
  audioCodecs,
  "audio"
);
var supportedVideoCodecs = getSupportedMediaFormats(
  videoContainers,
  videoCodecs,
  "video"
);
var videoContainer = supportedVideoCodecs.container[0];
var videoCodec = supportedVideoCodecs.codec[0];
var _a;
var audioCodec = (_a = supportedAudioCodecs == null ? void 0 : supportedAudioCodecs.codec) == null ? void 0 : _a[0];
var defaultCodec = `video/${videoContainer};codecs=${videoCodec}${audioCodec ? `,${audioCodec}` : ""}`;

// src/useRecordingStore.ts
var ERROR_MESSAGES = {
  CODEC_NOT_SUPPORTED: "CODEC_NOT_SUPPORTED",
  SESSION_EXISTS: "SESSION_EXISTS",
  NO_RECORDING_WITH_ID: "NO_RECORDING_WITH_ID",
  NO_USER_PERMISSION: "NO_USER_PERMISSION"
};
var STATUS = {
  INITIAL: "INITIAL",
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  RECORDING: "RECORDING",
  STOPPED: "STOPPED",
  ERROR: "ERROR",
  PAUSED: "PAUSED"
};
function createRecording({
  videoId,
  audioId,
  videoLabel,
  audioLabel
}) {
  const recordingId = `${videoId}-${audioId}`;
  const recording = {
    id: recordingId,
    audioId,
    audioLabel,
    blobChunks: [],
    fileName: String((/* @__PURE__ */ new Date()).getTime()),
    fileType: "webm",
    isMuted: false,
    mimeType: defaultCodec,
    objectURL: null,
    previewRef: createRef(),
    recorder: null,
    status: STATUS.INITIAL,
    videoId,
    videoLabel,
    webcamRef: createRef()
  };
  return recording;
}
var recordingMap = /* @__PURE__ */ new Map();
var store = createStore(recordingMap);
function useRecordingStore() {
  var _a2;
  const { state } = useStore(store);
  const activeRecordings = Array.from((_a2 = recordingMap == null ? void 0 : recordingMap.values) == null ? void 0 : _a2.call(recordingMap));
  const clearAllRecordings = () => __async(this, null, function* () {
    Array.from(state.values()).forEach((recording) => {
      var _a3;
      const stream = (_a3 = recording.webcamRef.current) == null ? void 0 : _a3.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    });
    state.clear(true);
  });
  const isRecordingCreated = (recordingId) => {
    const isCreated = state.get(recordingId);
    return Boolean(isCreated);
  };
  const getRecording = (recordingId) => {
    const recording = state.get(recordingId);
    if (!recording) {
      throw new Error(ERROR_MESSAGES.NO_RECORDING_WITH_ID);
    }
    return recording;
  };
  const setRecording = (params) => __async(this, null, function* () {
    const recording = createRecording(params);
    const newRecording = state.set(recording.id, recording, true);
    return newRecording;
  });
  const updateRecording = (recordingId, updatedValues) => __async(this, null, function* () {
    const recording = state.get(recordingId);
    const updatedRecording = state.set(
      recordingId,
      __spreadValues(__spreadValues({}, recording), updatedValues),
      true
    );
    return updatedRecording;
  });
  const deleteRecording = (recordingId) => __async(this, null, function* () {
    state.delete(recordingId, true);
  });
  return {
    activeRecordings,
    clearAllRecordings,
    deleteRecording,
    getRecording,
    isRecordingCreated,
    setRecording,
    updateRecording
  };
}

// src/devices.ts
function byId(devices) {
  return devices.reduce(
    (result, { deviceId, kind, label }) => {
      if (kind === "videoinput" || kind === "audioinput") {
        result[deviceId] = {
          label,
          type: kind
        };
      }
      return result;
    },
    {}
  );
}
function byType(devices) {
  return devices.reduce(
    (result, { deviceId, kind, label }) => {
      if (kind === "videoinput") {
        result.video.push({ label, deviceId });
      }
      if (kind === "audioinput") {
        result.audio.push({ label, deviceId });
      }
      return result;
    },
    {
      video: [],
      audio: []
    }
  );
}
function getUserPermission() {
  return __async(this, null, function* () {
    try {
      const stream = yield navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      const mediaDevices = yield navigator.mediaDevices.enumerateDevices();
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      return mediaDevices;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NO_USER_PERMISSION);
    }
  });
}
function getDevices() {
  return __async(this, null, function* () {
    let devicesByType = {
      video: [],
      audio: []
    };
    let devicesById = {};
    let initialDevices = {
      video: null,
      audio: null
    };
    if (typeof window !== "undefined") {
      const mediaDevices = yield getUserPermission();
      devicesById = byId(mediaDevices);
      devicesByType = byType(mediaDevices);
      initialDevices = {
        video: {
          deviceId: devicesByType.video[0].deviceId,
          label: devicesByType.video[0].label
        },
        audio: {
          deviceId: devicesByType.audio[0].deviceId,
          label: devicesByType.audio[0].label
        }
      };
    }
    return { devicesByType, devicesById, initialDevices };
  });
}
var DEFAULT_RECORDER_OPTIONS = {
  audioBitsPerSecond: 128e3,
  videoBitsPerSecond: 25e5,
  mimeType: defaultCodec
};
function useRecorder({
  mediaRecorderOptions,
  options,
  devices,
  handleError
}) {
  const {
    activeRecordings,
    clearAllRecordings,
    deleteRecording,
    getRecording,
    isRecordingCreated,
    setRecording,
    updateRecording
  } = useRecordingStore();
  const recorderOptions = useMemo(
    () => __spreadValues(__spreadValues({}, DEFAULT_RECORDER_OPTIONS), mediaRecorderOptions),
    [mediaRecorderOptions]
  );
  const startRecording = (recordingId) => __async(this, null, function* () {
    var _a2;
    try {
      const recording = getRecording(recordingId);
      const stream = (_a2 = recording.webcamRef.current) == null ? void 0 : _a2.srcObject;
      recording.mimeType = recorderOptions.mimeType || recording.mimeType;
      const isCodecSupported = MediaRecorder.isTypeSupported(
        recording.mimeType
      );
      if (!isCodecSupported) {
        console.warn("Codec not supported: ", recording.mimeType);
        handleError("startRecording", ERROR_MESSAGES.CODEC_NOT_SUPPORTED);
      }
      recording.recorder = new MediaRecorder(stream, recorderOptions);
      return yield new Promise((resolve) => {
        var _a3;
        if (recording.recorder) {
          recording.recorder.ondataavailable = (event) => {
            if (event.data.size) {
              recording.blobChunks.push(event.data);
            }
          };
          recording.recorder.onstart = () => __async(this, null, function* () {
            recording.status = STATUS.RECORDING;
            const updated = yield updateRecording(recording.id, recording);
            resolve(updated);
          });
          recording.recorder.onerror = (error) => {
            if (recordingId) {
              const recording2 = getRecording(recordingId);
              if (recording2)
                recording2.status = STATUS.ERROR;
            }
            handleError("startRecording", error);
          };
          (_a3 = recording.recorder) == null ? void 0 : _a3.start(options == null ? void 0 : options.timeSlice);
        }
      });
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("startRecording", error);
    }
  });
  const pauseRecording = (recordingId) => __async(this, null, function* () {
    var _a2, _b;
    try {
      const recording = getRecording(recordingId);
      (_a2 = recording.recorder) == null ? void 0 : _a2.pause();
      if (((_b = recording.recorder) == null ? void 0 : _b.state) === "paused") {
        recording.status = STATUS.PAUSED;
        const updated = yield updateRecording(recording.id, recording);
        return updated;
      }
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("pauseRecording", error);
    }
  });
  const resumeRecording = (recordingId) => __async(this, null, function* () {
    var _a2, _b;
    try {
      const recording = getRecording(recordingId);
      (_a2 = recording.recorder) == null ? void 0 : _a2.resume();
      if (((_b = recording.recorder) == null ? void 0 : _b.state) === "recording") {
        recording.status = STATUS.RECORDING;
        const updated = yield updateRecording(recording.id, recording);
        return updated;
      }
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("resumeRecording", error);
    }
  });
  const stopRecording = (recordingId) => __async(this, null, function* () {
    var _a2;
    try {
      const recording = getRecording(recordingId);
      (_a2 = recording.recorder) == null ? void 0 : _a2.stop();
      return yield new Promise((resolve) => {
        if (recording.recorder) {
          recording.recorder.onstop = () => __async(this, null, function* () {
            recording.status = STATUS.STOPPED;
            const blob = new Blob(recording.blobChunks, {
              type: recording.mimeType
            });
            const url = URL.createObjectURL(blob);
            recording.blob = blob;
            recording.objectURL = url;
            if (recording.previewRef.current) {
              recording.previewRef.current.src = url;
            }
            const updated = yield updateRecording(recording.id, recording);
            resolve(updated);
          });
        }
      });
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("stopRecording", error);
    }
  });
  const muteRecording = (recordingId) => __async(this, null, function* () {
    var _a2;
    try {
      const recording = getRecording(recordingId);
      (_a2 = recording.recorder) == null ? void 0 : _a2.stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      recording.isMuted = !recording.isMuted;
      return yield updateRecording(recording.id, recording);
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("muteRecording", error);
    }
  });
  const cancelRecording = (recordingId) => __async(this, null, function* () {
    var _a2, _b, _c;
    try {
      const recording = getRecording(recordingId);
      const tracks = (_a2 = recording == null ? void 0 : recording.recorder) == null ? void 0 : _a2.stream.getTracks();
      (_b = recording == null ? void 0 : recording.recorder) == null ? void 0 : _b.stop();
      tracks == null ? void 0 : tracks.forEach((track) => track.stop());
      ((_c = recording.recorder) == null ? void 0 : _c.ondataavailable) && (recording.recorder.ondataavailable = null);
      if (recording.webcamRef.current) {
        const stream = recording.webcamRef.current.srcObject;
        stream == null ? void 0 : stream.getTracks().forEach((track) => track.stop());
        recording.webcamRef.current.srcObject = null;
        recording.webcamRef.current.load();
      }
      URL.revokeObjectURL(recording.objectURL);
      yield deleteRecording(recording.id);
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("cancelRecording", error);
    }
  });
  const createRecording2 = (videoId, audioId) => __async(this, null, function* () {
    var _a2, _b, _c, _d, _e, _f;
    try {
      const { devicesById, initialDevices } = devices || {};
      const videoLabel = videoId ? devicesById == null ? void 0 : devicesById[videoId].label : (_a2 = initialDevices == null ? void 0 : initialDevices.video) == null ? void 0 : _a2.label;
      const audioLabel = audioId ? devicesById == null ? void 0 : devicesById[audioId].label : (_b = initialDevices == null ? void 0 : initialDevices.audio) == null ? void 0 : _b.label;
      const recordingId = `${videoId || ((_c = initialDevices == null ? void 0 : initialDevices.video) == null ? void 0 : _c.deviceId)}-${audioId || ((_d = initialDevices == null ? void 0 : initialDevices.audio) == null ? void 0 : _d.deviceId)}`;
      const isCreated = isRecordingCreated(recordingId);
      if (isCreated)
        throw new Error(ERROR_MESSAGES.SESSION_EXISTS);
      const recording = yield setRecording({
        videoId: videoId || ((_e = initialDevices == null ? void 0 : initialDevices.video) == null ? void 0 : _e.deviceId),
        audioId: audioId || ((_f = initialDevices == null ? void 0 : initialDevices.audio) == null ? void 0 : _f.deviceId),
        videoLabel,
        audioLabel
      });
      return recording;
    } catch (error) {
      handleError("createRecording", error);
    }
  });
  const applyRecordingOptions = (recordingId) => __async(this, null, function* () {
    try {
      const recording = getRecording(recordingId);
      if (options == null ? void 0 : options.fileName) {
        recording.fileName = options.fileName;
      }
      if (options == null ? void 0 : options.fileType) {
        recording.fileType = options.fileType;
      }
      const updatedRecording = yield updateRecording(recording.id, recording);
      return updatedRecording;
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("applyRecordingOptions", error);
    }
  });
  const clearPreview = (recordingId) => __async(this, null, function* () {
    try {
      const recording = getRecording(recordingId);
      if (recording.previewRef.current)
        recording.previewRef.current.src = "";
      recording.status = STATUS.INITIAL;
      URL.revokeObjectURL(recording.objectURL);
      recording.blobChunks = [];
      const updatedRecording = yield updateRecording(recording.id, recording);
      return updatedRecording;
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("clearPreview", error);
    }
  });
  const download = (recordingId) => __async(this, null, function* () {
    try {
      const recording = getRecording(recordingId);
      const downloadElement = document.createElement("a");
      if (recording == null ? void 0 : recording.objectURL) {
        downloadElement.href = recording.objectURL;
      }
      downloadElement.download = `${recording.fileName}.${recording.fileType}`;
      downloadElement.click();
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("download", error);
    }
  });
  return {
    activeRecordings,
    applyRecordingOptions,
    clearAllRecordings,
    clearPreview,
    download,
    cancelRecording,
    createRecording: createRecording2,
    muteRecording,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording
  };
}

// src/stream.ts
function startStream(videoId, audioId, constraints) {
  return __async(this, null, function* () {
    const newStream = yield navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: videoId } },
      audio: {
        deviceId: { exact: audioId }
      }
    });
    const tracks = newStream.getTracks();
    tracks.forEach((track) => track.applyConstraints(constraints));
    return newStream;
  });
}

// src/useCamera.ts
var DEFAULT_CONSTRAINTS = {
  aspectRatio: 1.7,
  echoCancellation: true,
  height: 720,
  width: 1280
};
function useCamera({
  mediaTrackConstraints,
  handleError
}) {
  const { getRecording, updateRecording } = useRecordingStore();
  const constraints = useMemo(
    () => __spreadValues(__spreadValues({}, DEFAULT_CONSTRAINTS), mediaTrackConstraints),
    [mediaTrackConstraints]
  );
  const applyConstraints = (recordingId, constraints2) => __async(this, null, function* () {
    var _a2, _b;
    try {
      const recording = getRecording(recordingId);
      if ((_a2 = recording.webcamRef.current) == null ? void 0 : _a2.srcObject) {
        const stream = (_b = recording.webcamRef.current) == null ? void 0 : _b.srcObject;
        const tracks = stream.getTracks() || [];
        tracks == null ? void 0 : tracks.forEach((track) => {
          track.applyConstraints(__spreadValues({}, constraints2));
        });
      }
      return recording;
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("applyConstraints", error);
    }
  });
  const openCamera = (recordingId) => __async(this, null, function* () {
    try {
      const recording = getRecording(recordingId);
      const stream = yield startStream(
        recording.videoId,
        recording.audioId,
        constraints
      );
      if (recording.webcamRef.current) {
        recording.webcamRef.current.srcObject = stream;
        yield recording.webcamRef.current.play();
      }
      recording.status = STATUS.OPEN;
      const updatedRecording = yield updateRecording(recording.id, recording);
      return updatedRecording;
    } catch (error) {
      handleError("openCamera", error);
    }
  });
  const closeCamera = (recordingId) => __async(this, null, function* () {
    var _a2;
    try {
      const recording = getRecording(recordingId);
      if (recording.webcamRef.current) {
        const stream = recording.webcamRef.current.srcObject;
        stream == null ? void 0 : stream.getTracks().forEach((track) => track.stop());
        ((_a2 = recording.recorder) == null ? void 0 : _a2.ondataavailable) && (recording.recorder.ondataavailable = null);
        recording.webcamRef.current.srcObject = null;
        recording.webcamRef.current.load();
      }
      recording.status = STATUS.CLOSED;
      const updatedRecording = yield updateRecording(recording.id, recording);
      return updatedRecording;
    } catch (error) {
      if (recordingId) {
        const recording = getRecording(recordingId);
        if (recording)
          recording.status = STATUS.ERROR;
      }
      handleError("closeCamera", error);
    }
  });
  return {
    applyConstraints,
    closeCamera,
    openCamera
  };
}
function useRecordWebcam({
  mediaRecorderOptions,
  mediaTrackConstraints,
  options
} = {}) {
  const [devices, setDevices] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  function handleError(functionName, error) {
    const message = typeof error === "string" ? error : typeof error.message === "string" ? error.message : "";
    setErrorMessage(message);
  }
  function clearError() {
    setErrorMessage(null);
  }
  const { applyConstraints, closeCamera, openCamera } = useCamera({
    mediaTrackConstraints,
    handleError
  });
  const {
    activeRecordings,
    applyRecordingOptions,
    cancelRecording,
    clearAllRecordings,
    clearPreview,
    createRecording: createRecording2,
    download,
    muteRecording,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording
  } = useRecorder({ mediaRecorderOptions, options, devices, handleError });
  function init() {
    return __async(this, null, function* () {
      try {
        const devices2 = yield getDevices();
        setDevices(devices2);
      } catch (error) {
        handleError("init", error);
      }
    });
  }
  useEffect(() => {
    init();
    return () => {
      clearAllRecordings();
    };
  }, []);
  return {
    activeRecordings,
    applyConstraints,
    applyRecordingOptions,
    cancelRecording,
    clearAllRecordings,
    clearError,
    clearPreview,
    closeCamera,
    createRecording: createRecording2,
    devicesById: devices == null ? void 0 : devices.devicesById,
    devicesByType: devices == null ? void 0 : devices.devicesByType,
    download,
    errorMessage,
    muteRecording,
    openCamera,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording
  };
}

export { ERROR_MESSAGES, STATUS, checkAudioCodecPlaybackSupport, checkRecordingCodecSupport, checkVideoCodecPlaybackSupport, defaultCodec, getDevices, supportedAudioCodecs, supportedVideoCodecs, useRecordWebcam };
