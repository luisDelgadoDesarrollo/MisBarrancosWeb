export function withAuthHeaderApplicationJson(request: RequestInit = {}): RequestInit {
  const credentials = localStorage.getItem('authCredentials')
  const headers: HeadersInit = {
    ...request.headers,
    Authorization: credentials ? `Basic ${credentials}` : '',
    'Content-Type': 'application/json',
  }

  return {
    ...request,
    headers,
  }
}

export function withAuthHeaderMultiPartFormData(request: RequestInit = {}): RequestInit {
  const credentials = localStorage.getItem('authCredentials')
  const headers: HeadersInit = {
    ...request.headers,
    Authorization: credentials ? `Basic ${credentials}` : '',
  }
  return {
    ...request,
    headers,
  }
}
