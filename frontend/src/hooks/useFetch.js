import { useState, useEffect, useCallback } from 'react'
import apiClient from '../services/apiClient'

/**
 * Custom hook for fetching data
 * @param {string} url - API endpoint
 * @param {object} options - Fetch options
 * @returns {object} - { data, loading, error, refetch }
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.get(url, options)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url, fetchData])

  return { data, loading, error, refetch: fetchData }
}

export default useFetch