import bcrypt from 'bcrypt'
import { type Hasher } from '../../../data/protocols/criptography/hasher'
import { type HashCompare } from '../../../data/protocols/criptography/hash-compare'

export class BcryptAdapter implements Hasher, HashCompare {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
