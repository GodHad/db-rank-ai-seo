import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { getFeaturedProducts } from '@/components/featuredProductSidebar/requests/use-request';

export const FeaturedProductSidebarContext = createContext();

export const FeaturedProductSidebarContextProvider = ({children}) => {
  const { data: featuredProducts } = useQuery('featured_products', getFeaturedProducts, { staleTime: 300000 });
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
        <FeaturedProductSidebarContext.Provider value={{
            toggleSidebar,
            setToggleSidebar,
            featuredProducts
          }}>
            {children}
        </FeaturedProductSidebarContext.Provider>
    )
}