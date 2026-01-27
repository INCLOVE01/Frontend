import { cn } from "@/lib/utils"

function H1({children,className}) {
  return (
    <h1 className={cn("scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",className)}>
      {children}
    </h1>
  )
}

function H2({children, className}) {
  return (
    <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",className)}>
      {children}
    </h2>
  )
}

function H3({children, className}){
    return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}   

function H4({children, className}) {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
      {children}
    </h4>
  )
}

function Para({children, className}){

  return (
    <p className={cn("leading-6",className)}>
      {children}
    </p>
  )

}

function Blockquote({children,className}) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  )
}

function Span({children, className}){

  return (
    <span className={cn("leading-7 ",className)}>
      {children}
    </span>
  )

}

export{
  H1, H2, H3, H4, Para, Blockquote, Span
}