import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Calendar, ChevronDown, Plus, Trash2 } from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────────

const font = '"Google Sans", sans-serif';

const inputBase: React.CSSProperties = {
  background: "white",
  border: "1px solid #e5e5e5",
  borderRadius: 8,
  height: "var(--input-height)",
  padding: "4px 12px",
  fontSize: 14,
  fontFamily: font,
  color: "#262626",
  textAlign: "right",
  direction: "rtl",
  width: "100%",
  boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: 14,
  fontWeight: 500,
  color: "#111827",
  textAlign: "right",
  display: "block",
  marginBottom: "var(--label-gap)" as string,
  width: "100%",
};

const fieldGap = "var(--field-gap)";

// ── Shared form primitives ────────────────────────────────────────────────────

type FieldProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
      {label && <label style={labelStyle}>{label}</label>}
      {children}
      {error && (
        <span style={{ fontFamily: font, fontSize: 12, color: "#dc2626", marginTop: 4, textAlign: "right" }}>
          {error}
        </span>
      )}
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", gap: fieldGap, width: "100%" }}>
      {children}
    </div>
  );
}

type FInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

function FInput({ label, error, ...props }: FInputProps) {
  return (
    <Field label={label} error={error}>
      <input
        {...props}
        style={{ ...inputBase, ...props.style }}
        dir="rtl"
      />
    </Field>
  );
}

type FDateProps = {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  error?: string;
};

function FDate({ label, value, onChange, error }: FDateProps) {
  return (
    <Field label={label} error={error}>
      <div style={{ position: "relative" }}>
        <Calendar
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
            color: "#737373",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <input
          type="date"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            ...inputBase,
            paddingRight: 36,
            color: value ? "#262626" : "#737373",
            // hide the browser's native calendar icon
            colorScheme: "light",
          } as React.CSSProperties}
          dir="rtl"
          // suppress native calendar icon via class
          className="hide-date-icon"
        />
      </div>
    </Field>
  );
}

type FSelectProps = {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
};

function FSelect({ label, value, onChange, options, placeholder, error }: FSelectProps) {
  return (
    <Field label={label} error={error}>
      <div style={{ position: "relative" }}>
        <ChevronDown
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
            color: "#737373",
            pointerEvents: "none",
          }}
        />
        <select
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            ...inputBase,
            paddingLeft: 36,
            appearance: "none",
            WebkitAppearance: "none",
            color: value ? "#262626" : "#737373",
          }}
          dir="rtl"
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </Field>
  );
}

type FTextareaProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  error?: string;
};

function FTextarea({ label, placeholder, value, onChange, error }: FTextareaProps) {
  return (
    <Field label={label} error={error}>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{
          ...inputBase,
          height: "auto",
          minHeight: 76,
          padding: "8px 12px",
          resize: "vertical",
          lineHeight: "20px",
        }}
        dir="rtl"
      />
    </Field>
  );
}

function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: fieldGap,
      }}
    >
      {children}
    </div>
  );
}

// ── TAB 1: הכנסות ─────────────────────────────────────────────────────────────

type RevenueData = {
  date: string;
  grossSales: string;
  netSales: string;
  cash: string;
  credit: string;
  checks: string;
  transfers: string;
  notes: string;
};

function RevenueForm({ data, setData, errors }: {
  data: RevenueData;
  setData: (d: RevenueData) => void;
  errors: Partial<Record<keyof RevenueData, string>>;
}) {
  const set = (k: keyof RevenueData) => (v: string) => setData({ ...data, [k]: v });
  return (
    <FormCard>
      <FDate
        value={data.date}
        onChange={set("date")}
        error={errors.date}
      />
      <FieldRow>
        <FInput
          label="מכירות ברוטו (₪)*"
          type="number"
          inputMode="decimal"
          value={data.grossSales}
          onChange={(e) => set("grossSales")(e.target.value)}
          error={errors.grossSales}
        />
        <FInput
          label="מכירות נטו (₪)"
          type="number"
          inputMode="decimal"
          value={data.netSales}
          onChange={(e) => set("netSales")(e.target.value)}
        />
      </FieldRow>
      <FieldRow>
        <FInput
          label="מזומן (₪)"
          type="number"
          inputMode="decimal"
          value={data.cash}
          onChange={(e) => set("cash")(e.target.value)}
        />
        <FInput
          label="אשראי (₪)"
          type="number"
          inputMode="decimal"
          value={data.credit}
          onChange={(e) => set("credit")(e.target.value)}
        />
      </FieldRow>
      <FieldRow>
        <FInput
          label="צ׳קים (₪)"
          type="number"
          inputMode="decimal"
          value={data.checks}
          onChange={(e) => set("checks")(e.target.value)}
        />
        <FInput
          label="העברות (₪)"
          type="number"
          inputMode="decimal"
          value={data.transfers}
          onChange={(e) => set("transfers")(e.target.value)}
        />
      </FieldRow>
      <FTextarea
        label="הערה"
        placeholder="אירוע מיוחד, הנחה, פסטיבל..."
        value={data.notes}
        onChange={set("notes")}
      />
    </FormCard>
  );
}

// ── TAB 2: פודקוסט ───────────────────────────────────────────────────────────

const FOOD_CATEGORIES = [
  { value: "produce", label: "ירקות ופירות" },
  { value: "dairy", label: "מוצרי חלב" },
  { value: "meat", label: "בשר ועוף" },
  { value: "dry", label: "מוצרים יבשים" },
  { value: "beverages", label: "משקאות" },
  { value: "other", label: "אחר" },
];

type FoodCostData = {
  supplier: string;
  date: string;
  amountExVat: string;
  amountIncVat: string;
  category: string;
  invoiceNumber: string;
};

function FoodCostForm({ data, setData, errors }: {
  data: FoodCostData;
  setData: (d: FoodCostData) => void;
  errors: Partial<Record<keyof FoodCostData, string>>;
}) {
  const set = (k: keyof FoodCostData) => (v: string) => {
    const next = { ...data, [k]: v };
    // Auto-calculate incVat when exVat changes
    if (k === "amountExVat" && v) {
      next.amountIncVat = (parseFloat(v) * 1.17).toFixed(2);
    }
    setData(next);
  };

  return (
    <FormCard>
      <FieldRow>
        <FDate
          value={data.date}
          onChange={set("date")}
          error={errors.date}
        />
        <FSelect
          placeholder="שם הספק"
          value={data.supplier}
          onChange={set("supplier")}
          options={[
            { value: "sup1", label: "ספק א׳" },
            { value: "sup2", label: "ספק ב׳" },
            { value: "sup3", label: "ספק ג׳" },
          ]}
          error={errors.supplier}
        />
      </FieldRow>
      <FieldRow>
        <FInput
          label='סכום כולל מע"מ (₪)'
          type="number"
          inputMode="decimal"
          value={data.amountIncVat}
          onChange={(e) => set("amountIncVat")(e.target.value)}
        />
        <FInput
          label='סכום ללא מע"מ (₪)*'
          type="number"
          inputMode="decimal"
          value={data.amountExVat}
          onChange={(e) => set("amountExVat")(e.target.value)}
          error={errors.amountExVat}
        />
      </FieldRow>
      <FieldRow>
        <FInput
          label="מספר חשבונית"
          placeholder="אופציונלי"
          value={data.invoiceNumber}
          onChange={(e) => set("invoiceNumber")(e.target.value)}
        />
        <FSelect
          label="קטגוריה"
          value={data.category}
          onChange={set("category")}
          options={FOOD_CATEGORIES}
          placeholder="בחר קטגוריה"
        />
      </FieldRow>
    </FormCard>
  );
}

// ── TAB 3: לייבור ─────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  { value: "kitchen", label: "מטבח" },
  { value: "service", label: "שירות" },
  { value: "bar", label: "בר" },
  { value: "management", label: "ניהול" },
  { value: "cleaning", label: "ניקיון" },
];

const EMPLOYEES = [
  { value: "emp1", label: "ישראל ישראלי" },
  { value: "emp2", label: "שרה כהן" },
  { value: "emp3", label: "משה לוי" },
];

type SingleLaborData = {
  employee: string;
  date: string;
  hours: string;
  department: string;
  netCost: string;
  hourlyRate: string;
};

function SummarySummaryBox({ netCost, hours, rate }: { netCost: number; hours: number; rate: number }) {
  const totalNet = netCost || (hours * rate);
  const employerCost = totalNet * 1.25;
  const total = totalNet + employerCost;

  return (
    <div
      style={{
        background: "#f0fdf4",
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ fontFamily: font, fontSize: 13, color: "#047857" }}>
        {`עלות מעביד (+25%): ₪${employerCost.toFixed(0)}`}
      </span>
      <div style={{ width: 1, height: 20, background: "#86efac" }} />
      <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: "#047857" }}>
        {`סה״כ עלות: ₪${(netCost ? total : 0).toFixed(0)}`}
      </span>
    </div>
  );
}

function SingleEmployeeForm({ data, setData, errors }: {
  data: SingleLaborData;
  setData: (d: SingleLaborData) => void;
  errors: Partial<Record<keyof SingleLaborData, string>>;
}) {
  const set = (k: keyof SingleLaborData) => (v: string) => setData({ ...data, [k]: v });
  const hours = parseFloat(data.hours) || 0;
  const rate = parseFloat(data.hourlyRate) || 0;
  const net = parseFloat(data.netCost) || 0;

  return (
    <FormCard>
      <FieldRow>
        <FDate
          value={data.date}
          onChange={set("date")}
          error={errors.date}
        />
        <FSelect
          placeholder="שם העובד"
          value={data.employee}
          onChange={set("employee")}
          options={EMPLOYEES}
          error={errors.employee}
        />
      </FieldRow>
      <FieldRow>
        <FSelect
          label="מחלקה"
          value={data.department}
          onChange={set("department")}
          options={DEPARTMENTS}
          placeholder="בחר מחלקה"
        />
        <FInput
          label="שעות*"
          type="number"
          inputMode="decimal"
          value={data.hours}
          onChange={(e) => set("hours")(e.target.value)}
          error={errors.hours}
        />
      </FieldRow>
      <FieldRow>
        <FInput
          label="תעריף/שעה"
          type="number"
          inputMode="decimal"
          value={data.hourlyRate}
          onChange={(e) => set("hourlyRate")(e.target.value)}
        />
        <FInput
          label="עלות נטו"
          type="number"
          inputMode="decimal"
          value={data.netCost}
          onChange={(e) => set("netCost")(e.target.value)}
        />
      </FieldRow>
      <SummarySummaryBox netCost={net} hours={hours} rate={rate} />
    </FormCard>
  );
}

type MultiEmployee = {
  name: string;
  hourlyRate: string;
  hours: string;
};

type MultiLaborData = {
  date: string;
  employees: MultiEmployee[];
};

function MultiEmployeeForm({ data, setData, errors }: {
  data: MultiLaborData;
  setData: (d: MultiLaborData) => void;
  errors: { date?: string; employees?: string };
}) {
  const setDate = (v: string) => setData({ ...data, date: v });

  const addEmployee = () => {
    setData({ ...data, employees: [...data.employees, { name: "", hourlyRate: "", hours: "" }] });
  };

  const removeEmployee = (i: number) => {
    setData({ ...data, employees: data.employees.filter((_, idx) => idx !== i) });
  };

  const updateEmployee = (i: number, field: keyof MultiEmployee, v: string) => {
    const next = data.employees.map((e, idx) => idx === i ? { ...e, [field]: v } : e);
    setData({ ...data, employees: next });
  };

  const totalNet = data.employees.reduce((acc, e) => {
    return acc + (parseFloat(e.hours) || 0) * (parseFloat(e.hourlyRate) || 0);
  }, 0);
  const employerCost = totalNet * 1.25;
  const total = totalNet + employerCost;

  // Grid column template (RTL visual order): [delete 40px] [hours 1fr] [rate 1fr] [name 2fr]
  // In dir="ltr" DOM: name(2fr) | rate(1fr) | hours(1fr) | delete(40px)
  const gridCols = "2fr 1fr 1fr 40px";

  return (
    <FormCard>
      {/* Shared date */}
      <FDate
        value={data.date}
        onChange={setDate}
        error={errors.date}
      />

      {/* Shared column header row — dir="rtl" so col1=rightmost=name */}
      {data.employees.length > 0 && (
        <div
          dir="rtl"
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: 8,
            paddingBottom: 4,
          }}
        >
          <span style={{ fontFamily: font, fontSize: 12, color: "#737373" }}>שם העובד</span>
          <span style={{ fontFamily: font, fontSize: 12, color: "#737373" }}>תעריף</span>
          <span style={{ fontFamily: font, fontSize: 12, color: "#737373" }}>שעות</span>
          <span />
        </div>
      )}

      {/* Employee rows — dir="rtl" so col1=rightmost=name */}
      {data.employees.map((emp, i) => (
        <div
          key={i}
          dir="rtl"
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: 8,
            alignItems: "center",
          }}
        >
          {/* שם העובד — name (widest, rightmost visually) */}
          <input
            type="text"
            placeholder="שם העובד"
            value={emp.name}
            onChange={(e) => updateEmployee(i, "name", e.target.value)}
            style={{
              height: "var(--input-height)",
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              padding: "0 10px",
              fontFamily: font,
              fontSize: 13,
              color: "#262626",
              textAlign: "right",
              direction: "rtl",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              background: "white",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            }}
          />

          {/* תעריף/שעה */}
          <input
            type="number"
            inputMode="decimal"
            placeholder="₪"
            value={emp.hourlyRate}
            onChange={(e) => updateEmployee(i, "hourlyRate", e.target.value)}
            style={{
              height: "var(--input-height)",
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              padding: "0 10px",
              fontFamily: font,
              fontSize: 13,
              color: "#262626",
              textAlign: "right",
              direction: "ltr",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              background: "white",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            }}
          />

          {/* שעות */}
          <input
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={emp.hours}
            onChange={(e) => updateEmployee(i, "hours", e.target.value)}
            style={{
              height: "var(--input-height)",
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              padding: "0 10px",
              fontFamily: font,
              fontSize: 13,
              color: "#262626",
              textAlign: "center",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              background: "white",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            }}
          />

          {/* Delete */}
          <button
            onClick={() => removeEmployee(i)}
            aria-label="הסר עובד"
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "#fee2e2",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Trash2 style={{ width: 15, height: 15, color: "#dc2626" }} />
          </button>
        </div>
      ))}

      {/* Add employee button */}
      <button
        onClick={addEmployee}
        style={{
          width: "100%",
          height: 48,
          border: "1.5px dashed #86efac",
          borderRadius: 8,
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          fontFamily: font,
          fontSize: 14,
          fontWeight: 500,
          color: "#047857",
        }}
      >
        <Plus style={{ width: 16, height: 16 }} />
        הוסף עובד
      </button>

      {/* Totals summary */}
      {data.employees.length > 0 && (
        <div
          style={{
            background: "#f0fdf4",
            borderRadius: 8,
            padding: "12px 16px",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: font, fontSize: 13, color: "#047857" }}>
            {`עלות מעביד (+25%): ₪${employerCost.toFixed(0)}`}
          </span>
          <div style={{ width: 1, height: 20, background: "#86efac" }} />
          <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: "#047857" }}>
            {`סה״כ עלות: ₪${total.toFixed(0)}`}
          </span>
        </div>
      )}
    </FormCard>
  );
}

type LaborData = {
  mode: "single" | "multi";
  single: SingleLaborData;
  multi: MultiLaborData;
};

function LaborForm({ data, setData }: {
  data: LaborData;
  setData: (d: LaborData) => void;
}) {
  const setMode = (mode: "single" | "multi") => setData({ ...data, mode });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Segmented control */}
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          background: "#f5f5f5",
          borderRadius: 8,
          padding: 3,
          gap: 2,
        }}
      >
        {(["עובד בודד", "מספר עובדים"] as const).map((label) => {
          const val: "single" | "multi" = label === "עובד בודד" ? "single" : "multi";
          const active = data.mode === val;
          return (
            <button
              key={label}
              onClick={() => setMode(val)}
              style={{
                flex: 1,
                height: 34,
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontFamily: font,
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? "#047857" : "#737373",
                background: active ? "white" : "transparent",
                boxShadow: active ? "0px 1px 3px rgba(0,0,0,0.10)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {data.mode === "single" ? (
        <SingleEmployeeForm
          data={data.single}
          setData={(s) => setData({ ...data, single: s })}
          errors={{}}
        />
      ) : (
        <MultiEmployeeForm
          data={data.multi}
          setData={(m) => setData({ ...data, multi: m })}
          errors={{}}
        />
      )}
    </div>
  );
}

// ── TAB 4: הוצאות ─────────────────────────────────────────────────────────────

const EXPENSE_TYPES = [
  { value: "electricity", label: "חשמל" },
  { value: "water", label: "מים" },
  { value: "rent", label: "שכירות" },
  { value: "insurance", label: "ביטוח" },
  { value: "maintenance", label: "תחזוקה" },
  { value: "marketing", label: "שיווק" },
  { value: "other", label: "אחר" },
];

type ExpenseData = {
  date: string;
  amount: string;
  expenseType: string;
  supplier: string;
  notes: string;
};

function ExpenseForm({ data, setData, errors }: {
  data: ExpenseData;
  setData: (d: ExpenseData) => void;
  errors: Partial<Record<keyof ExpenseData, string>>;
}) {
  const set = (k: keyof ExpenseData) => (v: string) => setData({ ...data, [k]: v });

  return (
    <FormCard>
      <FDate
        value={data.date}
        onChange={set("date")}
        placeholder="בחר תאריך"
        error={errors.date}
      />
      <FieldRow>
        <FSelect
          label="סוג הוצאה*"
          value={data.expenseType}
          onChange={set("expenseType")}
          options={EXPENSE_TYPES}
          placeholder="בחר סוג"
          error={errors.expenseType}
        />
        <FInput
          label="סכום*"
          type="number"
          inputMode="decimal"
          value={data.amount}
          onChange={(e) => set("amount")(e.target.value)}
          error={errors.amount}
        />
      </FieldRow>
      <FInput
        label="ספק/פרט"
        placeholder="חברת חשמל"
        value={data.supplier}
        onChange={(e) => set("supplier")(e.target.value)}
      />
      <FTextarea
        label="הערה"
        placeholder="פרטים נוספים"
        value={data.notes}
        onChange={set("notes")}
      />
    </FormCard>
  );
}

// ── Tab definitions ───────────────────────────────────────────────────────────

const TABS = ["הכנסות", "פודקוסט", "לייבור", "הוצאות"] as const;
type TabKey = typeof TABS[number];

// ── Main Screen ───────────────────────────────────────────────────────────────

export function ManualDataEntryScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("הכנסות");

  // Per-tab form state
  const [revenue, setRevenue] = useState<RevenueData>({
    date: "", grossSales: "", netSales: "", cash: "", credit: "", checks: "", transfers: "", notes: "",
  });
  const [foodCost, setFoodCost] = useState<FoodCostData>({
    supplier: "", date: "", amountExVat: "", amountIncVat: "", category: "", invoiceNumber: "",
  });
  const [labor, setLabor] = useState<LaborData>({
    mode: "single",
    single: { employee: "", date: "", hours: "", department: "", netCost: "", hourlyRate: "" },
    multi: { date: "", employees: [] },
  });
  const [expense, setExpense] = useState<ExpenseData>({
    date: "", amount: "", expenseType: "", supplier: "", notes: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (activeTab === "הכנסות") {
      if (!revenue.date) errs.date = "שדה חובה";
      if (!revenue.grossSales) errs.grossSales = "שדה חובה";
    } else if (activeTab === "פודקוסט") {
      if (!foodCost.date) errs.date = "שדה חובה";
      if (!foodCost.amountExVat) errs.amountExVat = "שדה חובה";
    } else if (activeTab === "לייבור") {
      if (labor.mode === "single") {
        if (!labor.single.date) errs.date = "שדה חובה";
        if (!labor.single.hours) errs.hours = "שדה חובה";
      } else {
        if (!labor.multi.date) errs.date = "שדה חובה";
        if (labor.multi.employees.length === 0) errs.employees = "יש להוסיף לפחות עובד אחד";
      }
    } else if (activeTab === "הוצאות") {
      if (!expense.date) errs.date = "שדה חובה";
      if (!expense.amount) errs.amount = "שדה חובה";
      if (!expense.expenseType) errs.expenseType = "שדה חובה";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    // TODO: Submit to API
    navigate(-1);
  }

  return (
    <div
      dir="rtl"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100svh",
        background: "white",
        fontFamily: font,
      }}
    >
      {/* iOS status bar */}
      <div style={{ height: 53, background: "white", flexShrink: 0 }} />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        dir="ltr"
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 var(--page-horizontal-padding)",
          background: "white",
          flexShrink: 0,
        }}
      >
        {/* Close — LEFT in LTR = right side physically (RTL screen left) */}
        <button
          onClick={() => navigate(-1)}
          aria-label="סגור"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#f5f5f5",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <X style={{ width: 20, height: 20, color: "#262626" }} />
        </button>

        {/* Title — center */}
        <span
          style={{
            flex: 1,
            fontFamily: font,
            fontSize: 18,
            fontWeight: 600,
            color: "#262626",
            textAlign: "center",
          }}
        >
          הזנת נתונים יומית
        </span>

        {/* Spacer to balance close button */}
        <div style={{ width: 36, flexShrink: 0 }} />
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div
        dir="ltr"
        style={{
          height: 59,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 var(--page-horizontal-padding)",
          flexShrink: 0,
        }}
      >
        {/* Tab order in DOM = LTR so they display RTL visually: הכנסות is rightmost */}
        {[...TABS].reverse().map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: "0 0 auto",
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontFamily: font,
                fontSize: 14,
                fontWeight: 500,
                background: active ? "#ecfccb" : "transparent",
                color: active ? "#047857" : "#262626",
                whiteSpace: "nowrap",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── Scrollable form content ─────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingLeft: "var(--page-horizontal-padding)",
          paddingRight: "var(--page-horizontal-padding)",
          paddingBottom: 100,
        }}
      >
        {activeTab === "הכנסות" && (
          <RevenueForm
            data={revenue}
            setData={setRevenue}
            errors={{ date: errors.date, grossSales: errors.grossSales }}
          />
        )}
        {activeTab === "פודקוסט" && (
          <FoodCostForm
            data={foodCost}
            setData={setFoodCost}
            errors={{ date: errors.date, amountExVat: errors.amountExVat }}
          />
        )}
        {activeTab === "לייבור" && (
          <LaborForm data={labor} setData={setLabor} />
        )}
        {activeTab === "הוצאות" && (
          <ExpenseForm
            data={expense}
            setData={setExpense}
            errors={{ date: errors.date, amount: errors.amount, expenseType: errors.expenseType }}
          />
        )}
      </div>

      {/* ── Sticky Save button ──────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTop: "1px solid #f0f0f0",
          padding: 16,
          paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <button
          onClick={handleSave}
          style={{
            width: "100%",
            height: 40,
            borderRadius: 8,
            background: "#059669",
            border: "none",
            cursor: "pointer",
            fontFamily: font,
            fontSize: 14,
            fontWeight: 600,
            color: "white",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          שמור
        </button>
      </div>
    </div>
  );
}
