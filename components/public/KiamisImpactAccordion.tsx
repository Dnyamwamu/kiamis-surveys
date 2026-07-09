"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus } from "lucide-react"

export function KiamisImpactAccordion() {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              1. Why is there a Government Fertilizer Subsidy program?
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          The Ministry Of Agriculture, Livestock, Fisheries and Cooperatives (MOALF&amp;C) is implementing a Presidential directive on provision of subsidized fertilizer to all farmers in all counties to increase food production during the planting seasons.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              2. Who qualifies for the subsidized fertilizer?
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          A duly registered farmer whose details are in the register provided to National Cereals &amp; Produce Board (NCPB) qualifies for the program.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              3. What do I need to be able to buy subsidized fertilizer?
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          You need to appear in person at the nearest NCPB depot with your original identity card, and your name must be in the register. Note that buying on behalf of someone else is not acceptable.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              4. What if I am not registered?
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          Registration is free of charge. If you are not registered, you are requested to visit your County, Sub-County, or Ward Agricultural Office for registration as a farmer.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              5. Where can I get the fertilizer from?
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          You can get the subsidized fertilizer from any of the nearest NCPB depots within the county where you are registered. Depots are open Monday to Friday from 8:00am to 5:00pm.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              6. How many bags of fertilizer can a farmer buy?
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          <p>Each registered farmer is entitled to a combined maximum of 100 bags (planting and top-dressing) per season, based on acreage (2 bags each per acre). For example:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>3 acres: Up to 12 bags</li>
            <li>15 acres: Up to 60 bags</li>
            <li>25+ acres: Up to 100 bags</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              7. How much do I pay for the subsidized fertilizers?
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          <p className="mb-2 font-medium">Approved selling prices per 50kg bag (Kshs):</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-white/5 p-3 rounded-lg border border-white/10">
            <span>DAP:</span> <span className="text-green-400 font-bold">3,500</span>
            <span>NPKs:</span> <span className="text-green-400 font-bold">3,275</span>
            <span>MOP:</span> <span className="text-green-400 font-bold">1,775</span>
            <span>UREA:</span> <span className="text-green-400 font-bold">3,500</span>
            <span>CAN:</span> <span className="text-green-400 font-bold">2,875</span>
            <span>Local Blends:</span> <span className="text-green-400 font-bold">3,275</span>
            <span>Sulphate of Ammonia:</span> <span className="text-green-400 font-bold">2,220</span>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              8. How do I make the payment?
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          <div className="space-y-2">
            <p>Payments are made after approval by the depot manager via:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>M-PESA: Through the official NCPB Till Number displayed at the Depot.</li>
              <li>Bank Deposit: As provided by the Depot/Silo Manager.</li>
              <li>Cooperatives: Direct bank transfer to NCPB bank account.</li>
            </ul>
            <p className="text-amber-400 text-xs font-bold mt-2 underline">Cash payments at the depot shall NOT be accepted.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              9. Can cooperatives and farmer organizations benefit?
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          Yes, all legally registered farmer cooperatives and organizations shall benefit. However, each individual member must be registered in the farmers register held by the NCPB Depot/Silo.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10" className="border-none">
        <AccordionTrigger className="hover:no-underline group text-green-400/90 hover:text-green-400 transition-colors">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 group-data-[state=open]:bg-green-500/20 transition-colors">
              <Plus className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-45" />
            </div>
            <span className="text-md font-semibold text-white group-hover:text-green-300 transition-colors">
              10. Important Rules: Reselling and Credit
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-12 text-gray-300">
          <ul className="list-disc ml-5 space-y-2">
            <li><strong>No Credit:</strong> Farmers are required to pay in full before collecting fertilizer.</li>
            <li><strong>Reselling:</strong> Buying fertilizer and reselling to others is strictly ILLEGAL.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  )
}