"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Paperclip } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";

const fileLabel = (file, placeholder) => file ? file.name : placeholder;
const ENDPOINT = "https://ertikazlawfirm.com/contact.php";

const JoinUsPage = () => {
    const t = useTranslations("joinUs");
    const locale = useLocale();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        avatar: null,
        cv: null,
        birth_date: "",
        gender: "",
    });

    const [calendarOpen, setCalendarOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const onFileChange = (field) => (e) => {
        updateField(field, e.target.files[0] || null);
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.email) newErrors.email = t("errors.emailRequired");
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("errors.emailInvalid");

        if (!formData.name) newErrors.name = t("errors.nameRequired");
        else if (formData.name.length < 3) newErrors.name = t("errors.nameShort");

        if (!formData.avatar) newErrors.avatar = t("errors.avatarRequired");
        if (!formData.cv) newErrors.cv = t("errors.cvRequired");
        if (!formData.birth_date) newErrors.birth_date = t("errors.birthDateRequired");
        if (!formData.gender || formData.gender === "default") newErrors.gender = t("errors.genderRequired");

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error(t("toast.error"));
            return;
        }

        const fd = new FormData();
        fd.append("name", formData.name);
        fd.append("email", formData.email);
        fd.append("phone", formData.phone);
        fd.append("birth_date", formData.birth_date);
        fd.append("gender", formData.gender);

        // لازم تسمي الملفات بنفس أسماء الحقول يلي الـ PHP عم يتوقعها
        if (formData.avatar) fd.append("avatar", formData.avatar);
        if (formData.cv) fd.append("cv", formData.cv);

        try {
            const res = await fetch("https://ertikazlawfirm.com/contact.php", {
                method: "POST",
                body: fd,
            });
            const data = await res.json();
            if (data.success) toast.success("✅ تم الإرسال بنجاح");
            else toast.error("❌ فشل الإرسال");
        } catch (err) {
            console.error(err);
            toast.error("خطأ في الاتصال بالخادم");
        }
    };



    const handleCancel = () => {
        setFormData({ name: "", email: "", avatar: null, cv: null, birth_date: "", gender: "" });
        setErrors({});
        toast.error(t("toast.cancel"));
    };

    return (
        <div className="max-w-4xl w-full mx-auto px-5 lg:px-2 py-16">
            <Toaster dir={locale === "ar" ? "rtl" : "ltr"} position="top-center" richColors />

            <h1 className='text-2xl sm:text-3xl font-bold my-10 text-center text-myPrimary'>
                {t("pageTitle")}
            </h1>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" className='mb-3 block text-myPrimary'>{t("email")}</Label>
                        <Input
                            id="email"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder={t("emailPlaceholder")}

                            className={`h-12 text-lg bg-myBackground placeholder:text-textPrimary rounded-full border ${errors.email ? "border-red-500" : "border-none"}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <Label htmlFor="name" className='mb-3 block text-myPrimary'>{t("name")}</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder={t("namePlaceholder")}
                            className={`h-12 text-lg bg-myBackground placeholder:text-textPrimary rounded-full border ${errors.name ? "border-red-500" : "border-none"}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Avatar */}
                    <div>
                        <Label className='mb-3 block text-myPrimary'>{t("avatar")}</Label>
                        <Input
                            id="avatar"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="hidden"
                            onChange={onFileChange("avatar")}
                        />
                        <label
                            htmlFor="avatar"
                            className={`flex h-12 w-full items-center justify-between bg-myBackground rounded-full border ${errors.avatar ? "border-red-500" : "border-none"} px-4 text-lg text-right transition-colors shadow-sm cursor-pointer`}
                        >
                            <span className="truncate w-fit text-sm text-textPrimary">
                                {fileLabel(formData.avatar, t("avatarPlaceholder"))}
                            </span>
                            <Paperclip className="h-5 w-5 text-textPrimary ml-2" />
                        </label>
                        {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
                    </div>

                    {/* Birth Date */}
                    <div>
                        <Label className='mb-3 block text-myPrimary'>{t("birthDate")}</Label>
                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className={`flex h-12 w-full items-center justify-between bg-myBackground text-textPrimary rounded-full border ${errors.birth_date ? "border-red-500" : "border-none"} px-4 text-sm text-right font-normal transition-colors shadow-sm`}
                                >
                                    {formData.birth_date ? format(new Date(formData.birth_date), "PPP") : t("birthDatePlaceholder")}
                                    <ChevronDown className="h-4 w-4 text-[#BCBDBD]" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={formData.birth_date ? new Date(formData.birth_date) : undefined}
                                    onSelect={(date) => {
                                        updateField("birth_date", date ? format(date, "yyyy-MM-dd") : "");
                                        setCalendarOpen(false);
                                    }}
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>}
                    </div>

                    {/* CV */}
                    <div>
                        <Label className='mb-3 block text-myPrimary'>{t("cv")}</Label>
                        <Input
                            id="cv"
                            type="file"
                            accept=".pdf, .docx, .jpg, .png"
                            className="hidden"
                            onChange={onFileChange("cv")}
                        />
                        <label
                            htmlFor="cv"
                            className={`flex h-12 w-full items-center justify-between bg-myBackground rounded-full border ${errors.cv ? "border-red-500" : "border-none"} px-4 text-lg text-right transition-colors shadow-sm cursor-pointer`}
                        >
                            <span className="truncate w-fit text-sm text-textPrimary">
                                {fileLabel(formData.cv, t("cvPlaceholder"))}
                            </span>
                            <Paperclip className="h-5 w-5 text-textPrimary ml-2" />
                        </label>
                        {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                        <Label className='mb-3 block text-myPrimary'>{t("gender")}</Label>
                        <Select
                            dir={locale == 'en' ? 'ltr' : 'rtl'}
                            value={formData.gender || "default"}
                            onValueChange={(v) => updateField("gender", v)}
                        >
                            <SelectTrigger className={`w-full h-12 bg-myBackground text-textPrimary rounded-full text-sm border ${errors.gender ? "border-red-500" : "border-none"}`}>
                                <SelectValue placeholder={t("genderPlaceholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="default" className="hidden text-sm">{t("genderPlaceholder")}</SelectItem>
                                <SelectItem value="male">{t("male")}</SelectItem>
                                <SelectItem value="female">{t("female")}</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row-reverse gap-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className='flex-1 h-12 rounded-full font-bold text-lg border-2 shadow-sm border-mySecondary hover:bg-white hover:text-myHover hover:border-myHover text-mySecondary transition'
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        type="submit"
                        className='flex-1 h-12 rounded-full bg-mySecondary hover:bg-myHover transition text-white font-bold text-lg shadow-md'>
                        {t("submit")}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default JoinUsPage;
