import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import staticProducts, { worldCupProducts as staticWorldCup } from '../data/products'

export function useProducts() {
  const [products, setProducts] = useState(staticProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .neq('category', 'mundial')
        .order('id')

      if (!error && data?.length > 0) {
        setProducts(data)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  return { products, loading }
}

export function useWorldCupProducts() {
  const [products, setProducts] = useState(staticWorldCup)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('collection', 'mundial')
        .order('id')

      if (!error && data?.length > 0) {
        setProducts(data)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  return { products, loading }
}

export function useProduct(slug) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()

      if (!error && data) {
        setProduct(data)
      } else {
        const all = [...staticProducts, ...staticWorldCup]
        setProduct(all.find(p => p.slug === slug) || null)
      }
      setLoading(false)
    }
    fetch()
  }, [slug])

  return { product, loading }
}

export function useRelatedProducts(productId) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .neq('id', productId)
        .limit(4)

      if (!error && data?.length > 0) {
        const shuffled = [...data].sort(() => Math.random() - 0.5)
        setProducts(shuffled.slice(0, 4))
      } else {
        const all = [...staticProducts, ...staticWorldCup]
        const others = all.filter(p => p.id !== productId)
        setProducts([...others].sort(() => Math.random() - 0.5).slice(0, 4))
      }
      setLoading(false)
    }
    fetch()
  }, [productId])

  return { products, loading }
}
