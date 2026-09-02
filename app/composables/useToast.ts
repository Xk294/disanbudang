export interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
}

export function useToast() {
  const toasts = useState<Toast[]>('app.toasts', () => [])

  function show(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      duration: 3500,
      ...toast,
    }

    toasts.value.push(newToast)

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, newToast.duration)
    }
    return id
  }

  function remove(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function success(title: string, message?: string) {
    return show({ type: 'success', title, message })
  }

  function error(title: string, message?: string) {
    return show({ type: 'error', title, message, duration: 5000 })
  }

  function info(title: string, message?: string) {
    return show({ type: 'info', title, message })
  }

  function warning(title: string, message?: string) {
    return show({ type: 'warning', title, message, duration: 4000 })
  }

  return {
    toasts,
    show,
    remove,
    success,
    error,
    info,
    warning,
  }
}
