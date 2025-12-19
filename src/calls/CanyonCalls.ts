import type {
  Canyon,
  CreateCanyonRequest,
  DownloadCanyonRequest,
  GetCanyonRequest,
  GetCanyonsRequest,
  GetFavouriteCanyonsRequest,
  LocationCanyon,
  SimpleCanyon,
  UpdateCanyonRequest,
} from '@/api'
import { withAuthHeaderApplicationJson } from './ApiUtils'
import { CanyonApi } from '@/api'

const canyonApi = new CanyonApi()

async function getCanyonWithAuth(requestParameters: GetCanyonRequest): Promise<Canyon> {
  // Instancia de tu cliente API

  // Prepara el objeto de opciones para la solicitud
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'GET',
  })

  // Llamar al método de la API con las opciones modificadas
  const response = await canyonApi.getCanyonRaw(requestParameters, initOverrides)
  try {
    return await response.value()
  } catch (error) {
    throw new Error(`Error updating canyon ${error}`)
  }
}

async function getFavouritesCanyons(
  requestParameters: GetFavouriteCanyonsRequest,
): Promise<Array<SimpleCanyon>> {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'GET',
  })

  try {
    return await canyonApi.getFavouriteCanyons(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error downloading canyon ${error}`)
  }
}

async function getCanyonsWithAuth(
  requestParameters: GetCanyonsRequest = {},
): Promise<Array<SimpleCanyon>> {
  // Instancia de tu cliente API

  // Prepara el objeto de opciones para la solicitud
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'GET',
  })

  // Llamar al método de la API con las opciones modificadas
  const response = await canyonApi.getCanyonsRaw(requestParameters, initOverrides)
  try {
    return await response.value()
  } catch (error) {
    throw new Error(`Error updating canyon ${error}`)
  }
}

async function insertCanyonsWithAuth(requestParameters: CreateCanyonRequest): Promise<Canyon> {
  // Instancia de tu cliente API

  // Prepara el objeto de opciones para la solicitud
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'POST',
  })

  try {
    return await canyonApi.createCanyon(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error creating canyon ${error}`)
  }
}

async function updateCanyonsWithAuth(requestParameters: UpdateCanyonRequest): Promise<Canyon> {
  // Instancia de tu cliente API

  // Prepara el objeto de opciones para la solicitud
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'PUT',
  })

  try {
    return await canyonApi.updateCanyon(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error updating canyon ${error}`)
  }
}

async function downloadCanyonWithAuth(requestParameters: DownloadCanyonRequest): Promise<Blob> {
  // Instancia de tu cliente API

  // Prepara el objeto de opciones para la solicitud
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'GET',
  })

  try {
    return await canyonApi.downloadCanyon(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error downloading canyon ${error}`)
  }
}

async function getLocations(): Promise<Array<LocationCanyon>> {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'GET',
  })

  try {
    return await canyonApi.getLocations(initOverrides)
  } catch (error) {
    throw new Error(`Error downloading canyon ${error}`)
  }
}

async function getAllFavourites(): Promise<Array<SimpleCanyon>> {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'GET',
  })

  try {
    return await canyonApi.getFavouriteCanyons({ page: 0, size: 3000 }, initOverrides)
  } catch (error) {
    throw new Error(`Error downloading canyon ${error}`)
  }
}

async function deleteCanyonFromFavourites(canyonId: number): Promise<void> {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'DELETE',
  })
  try {
    await canyonApi.deleteCanyonFromFavourites({ canyonId }, initOverrides)
  } catch (error) {
    throw new Error(`Error deleting canyon from favourites ${error}`)
  }
}

async function addCanyonToFavourites(canyonId: number): Promise<void> {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'POST',
  })
  try {
    await canyonApi.addCanyonToFavourites({ canyonId }, initOverrides)
  } catch (error) {
    throw new Error(`Error adding canyon form favourites ${error}`)
  }
}

export {
  getCanyonsWithAuth,
  insertCanyonsWithAuth,
  getCanyonWithAuth,
  updateCanyonsWithAuth,
  downloadCanyonWithAuth,
  getLocations,
  getAllFavourites,
  getFavouritesCanyons,
  deleteCanyonFromFavourites,
  addCanyonToFavourites,
}
