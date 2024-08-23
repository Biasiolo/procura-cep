import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import ResultDisplay from './ResultDisplay'

// Definindo o schema de validação com Yup
const schema = yup.object().shape({
  uf: yup
    .string()
    .length(2, 'UF deve ter 2 caracteres')
    .required('UF é obrigatório'),
  city: yup
    .string()
    .min(3, 'Cidade deve ter pelo menos 3 caracteres')
    .required('Cidade é obrigatória'),
  street: yup
    .string()
    .min(3, 'Logradouro deve ter pelo menos 3 caracteres')
    .required('Logradouro é obrigatório')
})

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
`

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`

interface FormData {
  uf: string
  city: string
  street: string
}

interface Address {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  cep: string
}

const AddressSearch: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const [addresses, setAddresses] = useState<Address[]>([])

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${data.uf}/${data.city}/${data.street}/json/`
      )
      setAddresses(response.data)
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Buscar Por Endereço</h3>
      <Input placeholder="UF (ex: RS)" {...register('uf')} />
      {errors.uf && <ErrorMessage>{errors.uf.message}</ErrorMessage>}

      <Input placeholder="Cidade" {...register('city')} />
      {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}

      <Input placeholder="Logradouro" {...register('street')} />
      {errors.street && <ErrorMessage>{errors.street.message}</ErrorMessage>}

      <Button type="submit">Buscar</Button>
      {addresses.length > 0 && <ResultDisplay address={addresses[0]} />}
    </Form>
  )
}

export default AddressSearch
