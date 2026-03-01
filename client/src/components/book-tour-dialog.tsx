import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface BookTourDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToWaitlist: () => void;
}

export function BookTourDialog({ open, onOpenChange, onSwitchToWaitlist }: BookTourDialogProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (open && !scriptLoaded.current) {
      const script = document.createElement("script");
      script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
      script.async = true;
      document.body.appendChild(script);
      scriptLoaded.current = true;
      trackEvent('tour_modal_open', 'engagement', 'book_tour');
    }
  }, [open]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSwitchToWaitlist = () => {
    trackEvent('switch_to_waitlist', 'engagement', 'from_tour_modal');
    onOpenChange(false);
    setTimeout(() => {
      onSwitchToWaitlist();
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] p-0 border-0 overflow-hidden" data-testid="tour-dialog">
        <VisuallyHidden>
          <DialogTitle>Book a Tour at 355 Main</DialogTitle>
          <DialogDescription>
            Schedule a private walkthrough of the 355 Main workspace.
          </DialogDescription>
        </VisuallyHidden>
        
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full hover:bg-muted"
            data-testid="button-close-tour"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="flex flex-col h-full overflow-y-auto">
          <div className="px-6 pt-8 pb-6 text-center border-b border-border">
            <h2 className="font-serif text-3xl md:text-4xl mb-3">Experience 355 Main.</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Now Pre-Leasing · Opening Spring 2026. Select a time for a tour.
            </p>
          </div>

          <div className="flex-1 p-6" ref={containerRef}>
            <div 
              className="meetings-iframe-container w-full min-h-[500px]" 
              data-src="https://meetings-na2.hubspot.com/parham/book-a-tour?embed=true"
              data-testid="hubspot-calendar-embed"
            />
          </div>

          <div className="px-6 py-4 border-t border-border bg-muted/30 text-center">
            <button
              onClick={handleSwitchToWaitlist}
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
              data-testid="button-switch-to-waitlist"
            >
              Not ready to tour? Join the Interest List
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
