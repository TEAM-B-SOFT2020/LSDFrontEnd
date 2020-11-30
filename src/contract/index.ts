import ContractRPC from './ContractRPC';
import ContractMock from './ContractMock';
import dotenv from 'dotenv';
dotenv.config();

const development: boolean = process.env.NODE_ENV === 'development';
development && console.warn('ATT:: Running ContractMock on development environment, change .evn for production.');
export default development ? ContractMock : ContractRPC;
