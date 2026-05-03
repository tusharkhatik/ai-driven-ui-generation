import apiClient from './apiClient'

export const generateUI = async (promptText) => {
  const response = await apiClient.post('/ui/generate', { promptText })
  return response.data
}

export const getHistory = async () => {
  const response = await apiClient.get('/ui/history')
  return response.data
}

export const getUIById = async (id) => {
  const response = await apiClient.get(`/ui/${id}`)
  return response.data
}