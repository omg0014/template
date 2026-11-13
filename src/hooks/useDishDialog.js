import { createContext, useContext } from 'react'

/** Lets any section in a template open that template's dish-detail dialog. */
export const DishDialogContext = createContext(() => {})
export const useOpenDish = () => useContext(DishDialogContext)
