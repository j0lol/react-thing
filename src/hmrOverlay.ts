
/* boilerplates */
export function registerRuntimeErrorListener() {
  function showErrorOverlay(error: ErrorPayload['err']) {
    const ErrorOverlay = customElements.get('vite-error-overlay')

    if (!ErrorOverlay) {
      return
    }

    console.error(error)
    const overlay = new ErrorOverlay(error)
    document.body.appendChild(overlay)
  }

  window.addEventListener('error', ({ error }) => showErrorOverlay(error))
  window.addEventListener('unhandledrejection', ({ reason }) =>
    showErrorOverlay(reason),
  )
}