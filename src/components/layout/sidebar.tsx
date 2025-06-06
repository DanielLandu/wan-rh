import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Building2, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { routes } from '@/lib/routes';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path) 
        : [...prev, path]
    );
  };

  return (
    <div 
      className={cn(
        "bg-primary text-primary-foreground border-r border-border transition-all duration-300 z-30 h-screen flex flex-col",
        open ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b border-primary-foreground/10">
        {open ? (
          <Link to="/\" className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <span className="font-bold text-lg">WANEC RH</span>
          </Link>
        ) : (
          <Building2 className="h-6 w-6 mx-auto" />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setOpen(!open)}
          className="focus:outline-none text-primary-foreground hover:bg-primary-foreground/10"
        >
          {open ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {routes.map((route) => {
            const isActive = location.pathname.startsWith(route.path);
            
            if (!route.children) {
              return (
                <Link 
                  key={route.path} 
                  to={route.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md mb-1 transition-colors",
                    isActive 
                      ? "bg-primary-foreground/20 text-primary-foreground font-medium" 
                      : "hover:bg-primary-foreground/10 text-primary-foreground/80"
                  )}
                >
                  <route.icon size={18} />
                  {open && <span>{route.label}</span>}
                </Link>
              );
            }
            
            const isExpanded = expandedItems.includes(route.path);
            
            return (
              <div key={route.path}>
                {open ? (
                  <Accordion
                    type="multiple"
                    value={expandedItems}
                    className="border-none"
                  >
                    <AccordionItem value={route.path} className="border-none">
                      <div 
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer",
                          isActive ? "text-primary-foreground" : "text-primary-foreground/80"
                        )}
                        onClick={() => toggleExpanded(route.path)}
                      >
                        <route.icon size={18} />
                        <span className="flex-1">{route.label}</span>
                        <AccordionTrigger className="h-4 w-4 p-0" />
                      </div>
                      <AccordionContent>
                        <div className="pl-7 space-y-1">
                          {route.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                                location.pathname === child.path
                                  ? "bg-primary-foreground/20 text-primary-foreground font-medium"
                                  : "hover:bg-primary-foreground/10 text-primary-foreground/80"
                              )}
                            >
                              <span>{child.label}</span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <div 
                    className={cn(
                      "flex items-center justify-center py-2 rounded-md cursor-pointer",
                      isActive ? "text-primary-foreground" : "text-primary-foreground/80"
                    )}
                    onClick={() => toggleExpanded(route.path)}
                  >
                    <route.icon size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}