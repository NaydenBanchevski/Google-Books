import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "../aceternity/components/blocks/expandable-card-demo-grid";
import { useOutsideClick } from "../aceternity/hooks/use-outside-click";

export function Cards({ cards }: { cards: any }) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            className="fixed inset-0 backdrop-blur-lg z-30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.id}`}
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              layoutId={`card-${active.id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div
                layoutId={`image-${active.id}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              >
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        transition: { duration: 0.2 },
                      }}
                      layoutId={`title-${active.id}`}
                      className="font-bold text-neutral-200 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        transition: { duration: 0.2 },
                      }}
                      layoutId={`description-${active.id}-${active.id}-${
                        active.authors?.join(", ") || "Unknown Author"
                      }`}
                      className="text-neutral-300 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.2 },
                    }}
                    layoutId={`button-${active.id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>

                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.2 },
                    }}
                    className="text-neutral-400 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-200 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto w-full  gap-4">
        {cards.map((card: any, index: any) => (
          <motion.div
            key={card.id}
            layoutId={`card-${card.id}-${index}`}
            onClick={() => setActive(card)}
            className="p-4 flex  flex-col md:flex-row justify-between items-center hover:border border-indigo-500 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col items-center md:flex-row">
              <motion.div layoutId={`image-${card.src}-${index}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40  md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <motion.h3
                  layoutId={`title-${card.title}-${index}`}
                  className="font-medium text-neutral-300 max-w-[400px]  text-center md:text-left"
                >
                  {card.title}
                </motion.h3>

                <motion.p
                  layoutId={`description-${card.description}-${index}`}
                  className="text-neutral-400  text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>

            <motion.button
              layoutId={`button-${card.id}-${index}`}
              className="text-sm w-[100px] h-[40px] rounded-full font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-white mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}
