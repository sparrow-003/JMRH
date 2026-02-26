import { motion } from "framer-motion";

const particulars = [
  { label: "Frequency", value: "Monthly" },
  { label: "Mode", value: "Online" },
  { label: "Subject", value: "Multidisciplinary" },
  { label: "Language", value: "English" },
  { label: "Starting Year", value: "2025" },
  { label: "ISSN (Online)", value: "Pending Assignment" },
];

const JournalParticularsSection = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="bg-charcoal rounded-t-xl py-4 px-8">
            <p className="text-center text-xs tracking-[0.25em] uppercase text-cream/80">
              Journal Particulars
            </p>
          </div>

          {/* Content */}
          <div className="bg-card border border-t-0 border-border rounded-b-xl p-8 md:p-12">
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              {particulars.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <p className="info-label mb-1">{item.label}</p>
                  <p className="info-value">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JournalParticularsSection;
