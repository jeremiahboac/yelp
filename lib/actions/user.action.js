'use server'

import { connect } from "../database/mongodb"
import User from "../models/user"

export const createUser = async (user) => {
  try {
    await connect()
    const newUser = await User.create(user)
    return newUser
  } catch (error) {
    console.log(error.message)
  }
}