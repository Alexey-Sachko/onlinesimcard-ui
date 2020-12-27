import {
  Container,
  Box,
  CircularProgress,
  Avatar,
  Typography,
} from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { useRegisterPageStyles } from '../Register/RegisterPage/RegisterPage.styled'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPasswordPage = ({ tokenId }: { tokenId: string }) => {
  const classes = useRegisterPageStyles()

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [appError, setAppError] = useState(false)
  const [isInvalidToken, setIsInvalidToken] = useState(false)

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {loading ? (
          <Box m={1}>
            <CircularProgress size={35} />
          </Box>
        ) : (
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        )}
        <Typography component="h1" variant="h5">
          Сброс пароля
        </Typography>
        {!isInvalidToken ? (
          <ResetPasswordForm
            tokenId={tokenId}
            onStartSubmit={() => {
              setLoading(true)
              setAppError(false)
            }}
            onCompleteSubmit={() => {
              setLoading(false)
              router.push('/signin')
            }}
            onErrorSubmit={(errType) => {
              if (errType === 'APP_ERROR') {
                setAppError(true)
              }
              setLoading(false)
            }}
            onInvalidToken={() => {
              setIsInvalidToken(true)
              setLoading(false)
            }}
          />
        ) : (
          <Box mt={2}>
            <Alert severity="error">
              Ссылка на сброс пароля не действительна
            </Alert>
          </Box>
        )}
      </div>
    </Container>
  )
}

export default ResetPasswordPage
