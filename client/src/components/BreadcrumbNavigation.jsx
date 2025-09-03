import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

export function BreadcrumbNavigation({ product }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className="pt-8">
      <BreadcrumbList>
        {/* Home always */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="font-semibold">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {
          pathnames.map((segment, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;

            // 🔹 Agar product page hai aur last segment hai → product.name show karo
            if (isLast && product?.name) {
              return (
                <div key={segment} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-blue-700 dark:text-blue-400">
                      {product.name.slice(0, 35) + "..." || segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </div>
              );
            }

            // 🔹 Normal segment
            return (
              <div key={segment} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-semibold text-blue-700 dark:text-blue-400">
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={routeTo} className="font-semibold">
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
