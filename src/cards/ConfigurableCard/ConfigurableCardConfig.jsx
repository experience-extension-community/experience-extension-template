// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Custom configuration form for ConfigurableCard.
//
// Persisted shape:
//   customConfiguration: {
//       client: {
//           categories: [
//               { id, name, links: [{ id, label, url }] },
//               ...
//           ]
//       }
//   }
//
// Read in ConfigurableCard:
//   cardInfo.configuration.customConfiguration.categories
//   (asymmetric — SDK lifts client.X to top level on read)
//
// Drag-to-reorder via @dnd-kit:
//   * Outer DndContext reorders categories
//   * Inner DndContext per-category reorders links within that category
//   * Cross-category link drag is intentionally not supported — keeps
//     UX simple; remove + add to move a link.

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Box,
    Button,
    Typography,
} from '@ellucian/react-design-system/core';
import {
    spacing10,
    spacing20,
    spacing30,
    spacing40,
} from '@ellucian/react-design-system/core/styles/tokens';

import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { brandColors } from '../../utils/branding/brandColors';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';
import { COLOR_PRESETS, normalizeColors, resolveColor } from './colorPresets';

const styles = () => ({
    root: {
        padding: spacing40,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing40,
    },
    categoryCard: {
        background: '#FFFFFF',
        border: `1px solid ${brandColors.border}`,
        borderRadius: 6,
        padding: spacing30,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
    },
    categoryDragging: {
        boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
    },
    categoryHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing20,
        paddingBottom: spacing20,
        borderBottom: `1px solid ${brandColors.border}`,
    },
    categoryName: {
        flex: '1 1 auto',
        height: 36,
        fontFamily: 'inherit',
        fontSize: '0.9375rem',
        fontWeight: 700,
        color: brandColors.textPrimary,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        padding: `0 ${spacing20}`,
        borderRadius: 4,
        transition: 'background-color 120ms ease-out, box-shadow 120ms ease-out',
        '&::placeholder': {
            color: brandColors.textMuted,
            fontWeight: 500,
        },
        '&:hover': {
            background: brandColors.surfaceMuted,
        },
        '&:focus': {
            background: brandColors.surfaceMuted,
            boxShadow: `0 0 0 3px ${brandColors.focusRing}33`,
        },
    },
    linksList: {
        marginLeft: 32,
        paddingLeft: spacing40,
        borderLeft: `3px solid ${brandColors.primary}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
        background: brandColors.surfaceMuted,
        padding: `${spacing20} ${spacing40}`,
        borderRadius: '0 4px 4px 0',
    },
    linkRow: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing20,
    },
    linkRowDragging: {
        opacity: 0.85,
    },
    linkFields: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'row',
        gap: spacing20,
    },
    inlineInput: {
        flex: '1 1 auto',
        height: 28,
        padding: `0 ${spacing20}`,
        fontSize: '0.8125rem',
        fontFamily: 'inherit',
        color: brandColors.textPrimary,
        background: '#FFFFFF',
        border: `1px solid ${brandColors.border}`,
        borderRadius: 4,
        outline: 'none',
        transition: 'border-color 120ms ease-out, box-shadow 120ms ease-out',
        '&::placeholder': {
            color: brandColors.textMuted,
        },
        '&:focus': {
            borderColor: brandColors.focusRing,
            boxShadow: `0 0 0 3px ${brandColors.focusRing}33`,
        },
    },
    inlineInputError: {
        borderColor: brandColors.danger,
        '&:focus': {
            borderColor: brandColors.danger,
            boxShadow: `0 0 0 3px ${brandColors.danger}33`,
        },
    },
    inlineLabelField: {
        flex: '0 1 35%',
        minWidth: 120,
    },
    inlineUrlField: {
        flex: '1 1 60%',
        minWidth: 160,
    },
    dragHandle: {
        flex: '0 0 auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        padding: 0,
        background: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        color: brandColors.textMuted,
        transition: 'color 120ms ease-out, background-color 120ms ease-out',
        '&:hover': {
            color: brandColors.textPrimary,
            backgroundColor: brandColors.surfaceMuted,
        },
        '&:active': { cursor: 'grabbing' },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 1,
        },
    },
    removeButton: {
        flex: '0 0 auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        padding: 0,
        background: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        color: brandColors.textMuted,
        transition: 'color 120ms ease-out, background-color 120ms ease-out',
        '&:hover:not(:disabled)': {
            color: brandColors.danger,
            backgroundColor: brandColors.surfaceMuted,
        },
        '&:disabled': {
            opacity: 0.35,
            cursor: 'not-allowed',
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 1,
        },
    },
    iconGlyph: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
        fontVariationSettings: '"FILL" 0, "wght" 500, "GRAD" 0, "opsz" 24',
        lineHeight: 1,
    },
    addLinkRow: {
        marginLeft: 32,
        paddingLeft: spacing40,
    },
    addRow: {
        alignSelf: 'flex-start',
    },
    sectionTitle: {
        marginTop: spacing20,
    },
    appearancePanel: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing30,
        padding: spacing40,
        background: '#FFFFFF',
        border: `1px solid ${brandColors.border}`,
        borderRadius: 6,
    },
    appearanceHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing30,
    },
    preview: {
        padding: `${spacing30} ${spacing40}`,
        background: brandColors.surfaceMuted,
        borderRadius: 6,
        border: `1px solid ${brandColors.border}`,
    },
    previewHeading: {
        fontSize: '0.6875rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: spacing20,
    },
    previewLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${spacing20} ${spacing30}`,
        fontSize: '0.875rem',
        fontWeight: 500,
        borderRadius: 4,
        marginBottom: spacing10,
    },
    previewChevron: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
    },
    swatchField: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
    },
    swatchLabel: {
        fontSize: '0.8125rem',
        fontWeight: 600,
        color: brandColors.textPrimary,
    },
    swatchRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing20,
    },
    swatchButton: {
        position: 'relative',
        width: 36,
        height: 36,
        padding: 0,
        border: `2px solid ${brandColors.border}`,
        borderRadius: '50%',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'border-color 120ms ease-out, transform 120ms ease-out',
        '&:hover': {
            transform: 'scale(1.08)',
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 2,
        },
    },
    swatchButtonSelected: {
        borderColor: brandColors.textPrimary,
    },
    swatchDot: {
        position: 'absolute',
        top: 3,
        left: 3,
        right: 3,
        bottom: 3,
        borderRadius: '50%',
    },
    swatchSelectedLabel: {
        fontSize: '0.75rem',
        color: brandColors.textSecondary,
        fontStyle: 'italic',
    },
});

const newId = (prefix) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const isValidUrl = (str) => {
    if (!str) return false;
    try {
        const u = new URL(str);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
};

const normalizeCategories = (raw) => {
    if (!Array.isArray(raw) || raw.length === 0) {
        return [{ id: newId('cat'), name: '', links: [{ id: newId('link'), label: '', url: '' }] }];
    }
    return raw.map((c) => ({
        id: c.id || newId('cat'),
        name: c.name || '',
        links: Array.isArray(c.links) && c.links.length > 0
            ? c.links.map((l) => ({
                  id: l.id || newId('link'),
                  label: l.label || '',
                  url: l.url || '',
              }))
            : [{ id: newId('link'), label: '', url: '' }],
    }));
};

// ─── Appearance: swatch picker + live preview ─────────────────────────────

const SwatchPicker = ({ classes, label, value, onChange, intl }) => (
    <div className={classes.swatchField}>
        <span className={classes.swatchLabel}>{label}</span>
        <div className={classes.swatchRow} role="radiogroup" aria-label={label}>
            {COLOR_PRESETS.map((preset) => {
                const selected = preset.key === value;
                const presetLabel = intl.formatMessage({
                    id: preset.labelId,
                    defaultMessage: preset.defaultLabel,
                });
                return (
                    <button
                        key={preset.key}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={presetLabel}
                        title={presetLabel}
                        className={`${classes.swatchButton}${
                            selected ? ` ${classes.swatchButtonSelected}` : ''
                        }`}
                        onClick={() => onChange(preset.key)}
                    >
                        <span
                            className={classes.swatchDot}
                            style={{ background: resolveColor(preset.key) }}
                        />
                    </button>
                );
            })}
            <span className={classes.swatchSelectedLabel}>
                {intl.formatMessage({
                    id: COLOR_PRESETS.find((p) => p.key === value)?.labelId
                        || 'card.configurable.color.muted',
                    defaultMessage:
                        COLOR_PRESETS.find((p) => p.key === value)?.defaultLabel
                        || 'Muted gray',
                })}
            </span>
        </div>
    </div>
);

SwatchPicker.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
};

const AppearancePreview = ({ classes, colors }) => {
    const previewStyle = {
        '--cc-category-color': resolveColor(colors.category),
        '--cc-link-color': resolveColor(colors.link),
        '--cc-hover-color': resolveColor(colors.hover),
    };
    return (
        <div className={classes.preview} style={previewStyle}>
            <div
                className={classes.previewHeading}
                style={{ color: 'var(--cc-category-color)' }}
            >
                Academics
            </div>
            <div
                className={classes.previewLink}
                style={{ color: 'var(--cc-link-color)' }}
            >
                Course catalog
            </div>
            <div
                className={classes.previewLink}
                style={{
                    color: 'var(--cc-hover-color)',
                    background: brandColors.surface,
                }}
            >
                Library (hover preview)
            </div>
        </div>
    );
};

AppearancePreview.propTypes = {
    classes: PropTypes.object.isRequired,
    colors: PropTypes.object.isRequired,
};

// ─── Sortable link row (inside a category) ────────────────────────────────

const SortableLinkRow = ({ link, classes, onChange, onRemove, canRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: link.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    };

    const urlInvalid = link.url.length > 0 && !isValidUrl(link.url);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${classes.linkRow}${isDragging ? ` ${classes.linkRowDragging}` : ''}`}
        >
            <button
                type="button"
                aria-label="Drag link"
                className={classes.dragHandle}
                {...attributes}
                {...listeners}
            >
                <span aria-hidden="true" className={classes.iconGlyph}>
                    drag_indicator
                </span>
            </button>
            <div className={classes.linkFields}>
                <input
                    type="text"
                    aria-label="Link label"
                    placeholder="Label"
                    value={link.label}
                    onChange={(e) => onChange(link.id, 'label', e.target.value)}
                    className={`${classes.inlineInput} ${classes.inlineLabelField}`}
                />
                <input
                    type="url"
                    aria-label="Link URL"
                    aria-invalid={urlInvalid}
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => onChange(link.id, 'url', e.target.value)}
                    className={`${classes.inlineInput} ${classes.inlineUrlField}${
                        urlInvalid ? ` ${classes.inlineInputError}` : ''
                    }`}
                    required
                />
            </div>
            <button
                type="button"
                aria-label="Remove link"
                onClick={() => onRemove(link.id)}
                disabled={!canRemove}
                className={classes.removeButton}
            >
                <span aria-hidden="true" className={classes.iconGlyph}>
                    close
                </span>
            </button>
        </div>
    );
};

SortableLinkRow.propTypes = {
    link: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    canRemove: PropTypes.bool.isRequired,
};

// ─── Sortable category card ───────────────────────────────────────────────

const SortableCategoryCard = ({ category, classes, sensors, onPatch, onRemove, canRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: category.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    };

    const handleNameChange = (value) => onPatch(category.id, { name: value });

    const handleLinkChange = (linkId, key, value) => {
        onPatch(category.id, {
            links: category.links.map((l) =>
                l.id === linkId ? { ...l, [key]: value } : l,
            ),
        });
    };

    const handleLinkRemove = (linkId) => {
        onPatch(category.id, {
            links: category.links.filter((l) => l.id !== linkId),
        });
    };

    const handleAddLink = () => {
        onPatch(category.id, {
            links: [...category.links, { id: newId('link'), label: '', url: '' }],
        });
    };

    const handleLinkDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = category.links.findIndex((l) => l.id === active.id);
        const newIndex = category.links.findIndex((l) => l.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;
        onPatch(category.id, { links: arrayMove(category.links, oldIndex, newIndex) });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${classes.categoryCard}${isDragging ? ` ${classes.categoryDragging}` : ''}`}
        >
            <div className={classes.categoryHeader}>
                <button
                    type="button"
                    aria-label="Drag category"
                    className={classes.dragHandle}
                    {...attributes}
                    {...listeners}
                >
                    <span aria-hidden="true" className={classes.iconGlyph}>
                        drag_indicator
                    </span>
                </button>
                <input
                    type="text"
                    aria-label="Category name"
                    placeholder="Category name"
                    value={category.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={classes.categoryName}
                />
                <button
                    type="button"
                    aria-label="Remove category"
                    onClick={() => onRemove(category.id)}
                    disabled={!canRemove}
                    className={classes.removeButton}
                >
                    <span aria-hidden="true" className={classes.iconGlyph}>
                        close
                    </span>
                </button>
            </div>

            <div className={classes.linksList}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleLinkDragEnd}
                >
                    <SortableContext
                        items={category.links.map((l) => l.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {category.links.map((link) => (
                            <SortableLinkRow
                                key={link.id}
                                link={link}
                                classes={classes}
                                onChange={handleLinkChange}
                                onRemove={handleLinkRemove}
                                canRemove={category.links.length > 1}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

            <div className={classes.addLinkRow}>
                <Button color="secondary" size="small" onClick={handleAddLink}>
                    Add link
                </Button>
            </div>
        </div>
    );
};

SortableCategoryCard.propTypes = {
    category: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    sensors: PropTypes.array.isRequired,
    onPatch: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    canRemove: PropTypes.bool.isRequired,
};

// ─── Main form ─────────────────────────────────────────────────────────────

const ConfigurableCardConfig = (props) => {
    const {
        classes,
        cardControl: { setCustomConfiguration, setIsCustomConfigurationValid },
        cardInfo: { configuration: { customConfiguration } = {} } = {},
    } = props;

    const intl = useIntl();
    useMaterialIconFonts();
    const client = customConfiguration ? customConfiguration.client : undefined;
    const [categories, setCategories] = useState(() =>
        normalizeCategories(client?.categories),
    );
    const [colors, setColors] = useState(() => normalizeColors(client?.colors));

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    useEffect(() => {
        updateCustomConfigVerification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateCustomConfig();
        updateCustomConfigVerification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, colors]);

    const updateCustomConfig = () => {
        setCustomConfiguration({
            customConfiguration: {
                client: {
                    categories,
                    colors,
                },
            },
        });
    };

    const handleColorChange = (key) => (next) => {
        setColors((prev) => ({ ...prev, [key]: next }));
    };

    const updateCustomConfigVerification = () => {
        let errorCount = 0;
        categories.forEach((cat) => {
            cat.links.forEach((l) => {
                if (!l || typeof l.url !== 'string' || !isValidUrl(l.url)) {
                    errorCount += 1;
                }
            });
        });
        setIsCustomConfigurationValid(errorCount === 0, errorCount);
    };

    const handleCategoryPatch = (id, patch) => {
        setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    };

    const handleCategoryRemove = (id) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    const handleAddCategory = () => {
        setCategories((prev) => [
            ...prev,
            { id: newId('cat'), name: '', links: [{ id: newId('link'), label: '', url: '' }] },
        ]);
    };

    const handleCategoryDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        setCategories((prev) => {
            const oldIndex = prev.findIndex((c) => c.id === active.id);
            const newIndex = prev.findIndex((c) => c.id === over.id);
            if (oldIndex === -1 || newIndex === -1) return prev;
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    const colorFields = [
        {
            key: 'category',
            labelId: 'card.configurable.color.field.category',
            defaultLabel: 'Category heading color',
        },
        {
            key: 'link',
            labelId: 'card.configurable.color.field.link',
            defaultLabel: 'Link text color',
        },
        {
            key: 'hover',
            labelId: 'card.configurable.color.field.hover',
            defaultLabel: 'Hover accent',
        },
    ];

    return (
        <Box className={classes.root}>
            <Typography variant="h6">
                {intl.formatMessage({
                    id: 'card.configurable.section.appearance',
                    defaultMessage: 'Appearance',
                })}
            </Typography>
            <div className={classes.appearancePanel}>
                <Typography variant="body2">
                    {intl.formatMessage({
                        id: 'card.configurable.section.colors.help',
                        defaultMessage:
                            'Pick brand presets that apply to every category and link in this card.',
                    })}
                </Typography>
                <AppearancePreview classes={classes} colors={colors} />
                {colorFields.map((field) => (
                    <SwatchPicker
                        key={field.key}
                        classes={classes}
                        intl={intl}
                        label={intl.formatMessage({
                            id: field.labelId,
                            defaultMessage: field.defaultLabel,
                        })}
                        value={colors[field.key]}
                        onChange={handleColorChange(field.key)}
                    />
                ))}
            </div>

            <Typography variant="h6" className={classes.sectionTitle}>
                {intl.formatMessage({
                    id: 'card.configurable.section.links',
                    defaultMessage: 'Configure links',
                })}
            </Typography>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleCategoryDragEnd}
            >
                <SortableContext
                    items={categories.map((c) => c.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {categories.map((cat) => (
                        <SortableCategoryCard
                            key={cat.id}
                            category={cat}
                            classes={classes}
                            sensors={sensors}
                            onPatch={handleCategoryPatch}
                            onRemove={handleCategoryRemove}
                            canRemove={categories.length > 1}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <Button color="primary" onClick={handleAddCategory} className={classes.addRow}>
                {intl.formatMessage({
                    id: 'card.configurable.action.addCategory',
                    defaultMessage: 'Add category',
                })}
            </Button>
        </Box>
    );
};

ConfigurableCardConfig.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired,
};

export default withIntl(
    withStyles(ConfigurableCardConfig, styles, { name: 'ConfigurableCardConfig' }),
);
