"use client"

import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiShoppingCart, FiHeart, FiSearch, FiMenu } from 'react-icons/fi'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
  import CartDropdown from './CartDropdown';
import FavoritesDropdown from './FavoritesDropdown';

interface SearchItem {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  slug: string;
}

const searchResults: SearchItem[] = [
  {
    id: 1,
    title: "Між Нами: про любов 2.0",
    image: "/між_нами_про_любов_2-1-1024x1024.webp",
    price: 749,
    oldPrice: 849,
    slug: "mizh-namy-pro-lubov"
  },
  {
    id: 2,
    title: "Між Нами: Kids",
    image: "/між_нами_kids-1-300x300.webp",
    price: 649,
    oldPrice: 749,
    slug: "mizh-namy-pro-vidnosyny"
  }
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100",
            className
          )} 
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500 mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const Loader = () => (
  <div className="absolute right-12 top-1/2 -translate-y-1/2">
    <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
  </div>
)

const SearchResult = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 bg-white border rounded-2xl mt-2 p-5 divide-y divide-gray-100"
        >
          <div className="flex items-center justify-between pb-4">
            <h3 className="font-medium text-gray-400">Знайдено товарів: 2</h3>
            <Link href="/search" className="text-sm text-black hover:underline">
              Показати всі
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {searchResults.map((item) => (
              <div key={item.id} className="flex gap-6 py-5 group">
                <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {item.oldPrice && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs font-medium px-2 py-1 rounded-full">
                      -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <Link 
                    href={`/products/${item.slug}`} 
                    className="font-medium text-lg mb-2 hover:text-gray-600 transition-colors line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-semibold">{item.price} ₴</span>
                    {item.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {item.oldPrice} ₴
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors">
                      В кошик
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                      <FiHeart size={18} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center pt-4">
            <button className="text-sm text-gray-500 hover:text-black transition-colors">
              Завантажити ще
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Header = () => {
  const pathname = usePathname()
  const [searchValue, setSearchValue] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    if (searchValue.length >= 1) {
      const timer = setTimeout(() => {
        setIsLoading(true)
        // Имитация API запроса
        setTimeout(() => {
          setIsLoading(false)
          setShowResults(true)
        }, 1000)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setShowResults(false)
    }
  }, [searchValue])

  const menuItems = [
    { title: 'Набори', href: '/sets' },
    { title: 'Про нас', href: '/about' },
    { title: 'FAQ', href: '/cooperation' },
  ]

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container px-4">
        {/* Mobile Search Bar */}
        <div className="block lg:hidden py-3 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Пошук ігор..."
              className="w-full py-2.5 px-5 pr-12 bg-gray-50 rounded-full border-0 focus:ring-1 focus:ring-black text-sm"
            />
            <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="h-16 lg:h-[90px] flex items-center justify-between gap-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center">
              <Link href="/" className="text-lg lg:text-xl font-bold">
                MemoGames
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="h-5 w-[1px] bg-gray-200 mx-6" />
              <nav className="flex items-center space-x-1">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-[14px] font-medium text-gray-600">Усі ігри</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a className="flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('/test.png')] bg-cover bg-center transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                                <div className="relative z-10">
                                  <div className="mb-2 text-lg font-medium text-white">
                                    Подарункові набори
                                  </div>
                                  <p className="text-sm leading-tight text-gray-100">
                                    Найкращі ігри для особливих моментів та незабутніх вражень
                                  </p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <ListItem href="/friends" title="Друзям">
                          Настільні ігри для веселих посиденьок з друзями.
                          </ListItem>
                          <ListItem href="/couples" title="Парам">
                          Ігри для романтичного вечора вдвох
                          </ListItem>
                          <ListItem href="/family" title="Сім'ї">
                          Сімейні ігри для всіх вікових категорій
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-[14px] font-medium text-gray-600">Для розвитку</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <ListItem href="/single" title="Для одного">
                          Індивідуальні розвиваючі ігри
                          </ListItem>
                          <ListItem href="/development" title="Розвиваючі">
                          Ігри для розвитку пам'яті та мислення
                          </ListItem>
                          <ListItem href="/conversation" title="Розмовні ігри">
                          Ігри для покращення комунікації
                          </ListItem>
                          <ListItem href="/logic" title="Логічні ігри">
                          Ігри для розвитку логічного мислення
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    {menuItems.map((item) => (
                      <NavigationMenuItem key={item.href}>
                        <Link
                          href={item.href}
                          className={`px-3 py-2 rounded-md text-[14px] font-medium transition-colors
                            ${pathname === item.href 
                              ? 'bg-black text-white' 
                              : 'text-gray-600 hover:bg-gray-100'
                            }
                          `}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:block flex-1 max-w-lg mx-4 relative">
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Пошук ігор..."
                className="w-full py-3 px-5 pr-12 bg-gray-50 rounded-full border-0 focus:ring-1 focus:ring-black transition-all"
                onFocus={() => setIsSearching(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setIsSearching(false)
                    setShowResults(false)
                  }, 200)
                }}
              />
              {isLoading ? (
                <Loader />
              ) : (
                <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
            </div>
            <SearchResult isVisible={isSearching && showResults} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
              className="hidden lg:flex items-center justify-center w-11 h-11 hover:bg-gray-50 rounded-full transition-all group"
              onClick={() => setIsFavoritesOpen(true)}
            >
              <FiHeart 
                size={22} 
                className="text-gray-700 transition-colors group-hover:text-black" 
              />
            </button>
            <button 
              className="relative flex items-center justify-center w-11 h-11 hover:bg-gray-50 rounded-full transition-all group"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart 
                size={22} 
                className="text-gray-700 transition-colors group-hover:text-black" 
              />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-black text-white text-xs font-medium rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                3
              </span>
            </button>
            <button className="lg:hidden flex items-center justify-center w-11 h-11 hover:bg-gray-50 rounded-full">
              <FiMenu size={22} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FavoritesDropdown isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </header>
  )
}

export default Header
